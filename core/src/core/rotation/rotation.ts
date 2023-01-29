import { Charbox } from "@core/charbox"
import { Instance } from "@core/instance"
import { Rotation as RotationFormula } from "@core/formula"
import type { Action, Details, Register, Summary } from "./type"
import { MapList } from "@src/utils/lists/list"
import { Logger } from "@src/cmd2"


/** rotation is a sequence of hits and actions that results in a damage value */
export class Rotation {

    /** rotation characters */
    private characters = new MapList<Charbox>(a => a.GetCharacter().Options.Name)
    /** rotation actions */
    private actions: Action[] = []

    /** accumulated damage */
    private damage = 0

    /** rotation duration, in seconds */
    Duration = NaN

    /** logger object. If provided, it will save the action results */
    Log?: Logger
    /** details register */
    private details: Register[] = []

    /** Sets the rotation characters */
    SetCharacters(...characters: Charbox[]): Rotation {
        this.characters.Clear()
        this.characters.AddList(characters)
        return this
    }

    /** Runs the rotation and calculates the damage */
    Run(): number {
        let prevline = -1
        if (this.Log) {
            prevline = this.Log.Line
        }
        this.damage = 0
        this.details = []
        this.actions.forEach(action => this.runAction(action))
        if (this.Log) {
            this.Log.Line = prevline
        }
        return this.damage
    }

    /** Adds a function to the rotation */
    AddFn(fn: () => void, line?: number): Rotation {
        this.actions.push({ fn, line })
        return this
    }
    /** Adds a single hit to the rotation */
    AddHit(charname: string, hitname: string, multiplier: number, reaction: number, aura: number, line?: number): Rotation {
        aura = Math.max(0, Math.min(1, aura))
        reaction = Math.max(0, Math.min(aura, reaction))
        this.actions.push({
            hit: {
                charname,
                hitname,
                multiplier,
                aura,
                reaction,
            },
            line
        })
        return this
    }

    /** Removes all actions from the rotation */
    Clear(): Rotation {
        this.actions = []
        return this
    }

    /** Gets the details hit-by-hit of the last rotation run */
    GetDetails(): Details {
        const details: Details = {}

        this.details.forEach((reg, i) => {
            if (!details[reg.charname]) details[reg.charname] = []
            details[reg.charname][i] = reg
        })

        return details
    }

    /** Gets a summary of the damage in the last rotation run */
    GetSummary(): Summary {
        const summary: Summary = {
            damage: this.damage,
            dps: this.damage / this.Duration,
            duration: this.Duration,
            characters: {}
        }

        // initialize empty summary
        for (const character of this.characters.Get()) {
            summary.characters[character.GetCharacter().Options.Name] = {
                relative: 0,
                damage: 0,
                dps: 0,
                elements: {},
                talents: {},
                instances: {},
            }
        }

        // add each register
        for (const { charname, hitname, talent, element, damage } of this.details) {
            const item = summary.characters[charname]
            item.damage += damage

            if (!item.elements[element]) {
                item.elements[element] = {
                    damage: 0,
                    relative: 0,
                }
            }
            item.elements[element].damage += damage

            if (!item.talents[talent]) {
                item.talents[talent] = {
                    damage: 0,
                    relative: 0,
                }
            }
            item.talents[talent].damage += damage

            if (!item.instances[hitname]) {
                item.instances[hitname] = {
                    damage: 0,
                    relative: 0,
                }
            }
            item.instances[hitname].damage += damage
        }

        // set relative damages
        for (const char in summary.characters) {
            const item = summary.characters[char]
            item.dps = item.damage / this.Duration
            item.relative = item.damage / this.damage
            for (const key in item.instances) {
                item.instances[key].relative = item.instances[key].damage / item.damage
            }
            for (const key in item.talents) {
                item.talents[key].relative = item.talents[key].damage / item.damage
            }
            for (const key in item.elements) {
                item.elements[key].relative = item.elements[key].damage / item.damage
            }
        }

        return summary
    }

    /** Gets a character by its name */
    private getCharacter(name: string): Charbox | undefined {
        const char = this.characters.Find(name)
        if (!char) {
            if (this.Log) {
                this.Log.Errorf("Character not found: %s", name)
            }
        }
        return char
    }

    /** Gets a character instance by its name */
    private getInstance(charname: string, insname: string): Instance | undefined {
        const char = this.getCharacter(charname)
        if (!char) {
            return undefined
        }
        const ins = char.FindInstance(insname)
        if (!ins) {
            if (this.Log) {
                this.Log.Errorf("Instance %s not found in character %s", insname, charname)
            }
        }
        return ins
    }

    /** Adds damage to the rotation register */
    private addDamage(reg: Register): void {
        this.damage += reg.damage
        if (this.Log) {
            this.details.push(reg)
        }
    }

    /** runs a single action */
    private runAction(action: Action) {
        if (action.line && this.Log) {
            this.Log.Line = action.line
        }
        if (action.fn) {
            action.fn()
            return
        }
        if (!action.hit) {
            return
        }
        const { hit } = action
        const character = this.getCharacter(hit.charname)
        if (!character) { return }
        const ins = this.getInstance(hit.charname, hit.hitname)
        if (!ins) { return }

        const charname = character.GetCharacter().Options.Name
        const hitname = ins.Options.Name
        const enemy = character.GetCharacter().GetEnemy()

        const auras = enemy.GetAuras()

        const yesaura_yesreaction = ins.DmgAvg(true)
        const yesaura_noreaction = ins.DmgAvg(false)
        enemy.SetAuras()
        const noaura_noreaction = ins.DmgAvg(false)
        const noaura_yesreaction = noaura_noreaction
        enemy.SetAuras(...auras)

        const singleDamage = RotationFormula(
            noaura_noreaction,
            noaura_yesreaction,
            yesaura_noreaction,
            yesaura_yesreaction,
            hit.aura,
            hit.reaction,
        )
        const damage = hit.multiplier * singleDamage
        this.addDamage({
            charname,
            hitname,
            talent: ins.Options.Talent,
            element: ins.GetElement(),
            damage,
            single_damage: singleDamage,
            multiplier: hit.multiplier,
            auras,
            noaura_noreaction,
            noaura_yesreaction,
            yesaura_noreaction,
            yesaura_yesreaction,
            aura: hit.aura,
            reaction: hit.reaction,
        })

        if (this.Log) {
            this.Log.Logf("%s hit %s did (%.2f * %.2f) = %.2f damage", charname, hitname, hit.multiplier, singleDamage, damage)
        }
    }
}