import type { Charbox } from "@core/charbox"
import { Artifact } from "@core/artifact"
import { piece } from "@core/stats"
import { ArtifactEvent } from "@core/artifact/events"
import { Effect } from "@core/effect"
import { FindByName } from "@src/resources/sets"
import { EquipRolls, Options } from "@core/artifact/rolls/equip"
import { Result } from "@core/artifact/rolls/count"
import { GetSubstatValue, SubstatTier } from "../scaling/substat_data"
import { MapList } from "@src/utils/lists/list"
import { CountSets } from "./count"

/** Container for multiple artifacts and the set effects */
export class Artbox {
    constructor(private target: Charbox) {
        this.artifacts = piece.Values().map(piece => {
            const art = new Artifact(piece).Equip(target.GetCharacter())
            art.Event.CreateObserver(ArtifactEvent.CHANGE_SET, () => this.onChangeSet())
            return art
        })
    }
    private artifacts: Artifact[]
    private effects = new MapList<Effect>(ef => ef.Options.Name)

    private sets: string[] = []

    /**  gets the stored artifacts */
    GetArtifacts(): readonly Artifact[] {
        return this.artifacts
    }

    /** Gets the name of the active sets in the artifacts box */
    GetActiveSets(): readonly string[] {
        return this.sets
    }

    /** runs when set name changes on an artifact */
    private onChangeSet(): void {
        const [bonus, sets] = CountSets(this.artifacts.map(art => art.GetSet() || ""))
        // remove previous effects
        this.effects.Get().forEach(ef => ef.Disable().UnapplyAll())
        this.effects.Clear()

        // save set names
        this.sets = sets

        // insert new effects of 2-piece and 4-piece sets
        for (const [name, count] of bonus) {
            if (!name) { continue }
            
            const generator = FindByName(name)
            if (!generator) { continue }
            if (count >= 2) {
                generator.Piece2
                    .map(gen => {
                        const ef = gen(this.target).Enable()
                        ef.Apply(this.target)
                        return ef
                    })
                    .forEach(ef => this.effects.Add(ef))
            }
            if (count >= 4) {
                generator.Piece4
                    .map(gen => {
                        const ef = gen(this.target).Enable()
                        ef.Apply(this.target)
                        return ef
                    })
                    .forEach(ef => this.effects.Add(ef))
            }
        }
    }


    /** Unequips all the artifacts from the target */
    UnequipAll(): Artbox {
        this.artifacts.forEach(art => art.Unequip())
        return this
    }

    /** Equips all the artifacts to the target */
    EquipAll(): Artbox {
        this.artifacts.forEach(art => art.Equip(this.target.GetCharacter()))
        return this
    }

    /** Gets the artifact set effects */
    GetEffects(): readonly Effect[] {
        return this.effects.Get()
    }
    /** Find an effect by its name */
    FindEffect(name: string): Effect | undefined {
        return this.effects.Find(name)
    }

    /** Gets the artifact in the given position */
    Get(index: number): Artifact {
        return this.artifacts[index]
    }

    /** Removes all the artifacts and effects */
    Remove() {
        this.UnequipAll()
        this.effects.Get().forEach(ef => ef.Disable().UnapplyAll())
    }

    /** 
     * Equips a given amount of rolls to the artifacts.
     * @return Whether the requested rolls were equipped or not
     */
    EquipRolls(options: Omit<Options, "mainstats" | "stars">): boolean {
        try {
            const solution = EquipRolls({
                stars: 5,
                mainstats: [
                    this.artifacts[2].GetMainstat(),
                    this.artifacts[3].GetMainstat(),
                    this.artifacts[4].GetMainstat(),
                ],
                ...options,
            })
            this.artifacts.forEach((art, i) => {
                const toequip = solution[i]
                art.ClearSubstats()
                toequip.forEach(([stat, value], i) => {
                    if (art.SubstatsLength() <= i) {
                        art.AddSubstat(stat, value)
                    } else {
                        art.SetSubstat(i, stat)
                        art.SetSubstatValue(i, value)
                    }
                })
            })
            return true
        }
        catch (e) {
            console.error("[EQUIP SUBSTATS]", e)
            return false
        }
    }

    /** Gets a summary of the rolls of the artifacts */
    RollSummary(): Summary {
        const total = row()
        const result: Result = []
        const indexes: { [stat: number]: number } = {}
        for (const art of this.artifacts) {
            const artRolls = art.Rolls()
            for (const [stat, rolls] of artRolls) {
                if (indexes[stat] === undefined) {
                    indexes[stat] = result.length
                    result.push([stat, row()])
                }
                const [, target] = result[indexes[stat]]
                for (let i = 0; i < 4; i++) {
                    target[i] += rolls[i] || 0
                    total[i] += rolls[i] || 0
                    target[4] += rolls[i] || 0
                    total[4] += rolls[i] || 0
                }
            }
            for (let i = 0; i < art.SubstatsLength(); i++) {
                const stat = art.GetSubstat(i)
                const value = art.GetSubstatValue(i)

                const rolls = Math.round(value / GetSubstatValue(art.GetStars(), stat, SubstatTier.ROLL_AVG))
                total[5] += rolls
                result[indexes[stat]][1][5] += rolls
            }
        }
        return { result, total }
    }
}
const row = () => [0, 0, 0, 0, 0, 0]
export interface Summary {
    result: Result
    total: number[]
}