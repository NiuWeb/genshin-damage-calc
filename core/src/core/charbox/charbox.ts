import type { Character } from "@core/character"
import type { Instance } from "@core/instance/instance"
import type { Effect } from "@core/effect"
import type { Party } from "./party"
import type { Weapon } from "@core/weapon/weapon"
import type { Generator as WeaponGenerator } from "@core/weapon/factory"
import type { Artbox } from "@core/artbox/artbox"
import { Modifier, Subject } from "@core/subject"
import { CharboxEvent } from "./event"
import { MapList } from "@src/utils/lists/list"

/**
 * Options to create a charbox from static method
 */
interface Options {
    character: Character,
    normals: Instance[],
    bursts: Instance[],
    skills: Instance[],
    tr: Instance[],
    extra: Instance[],
    effects: Effect[],
}
/** Location of a damage instance */
export type InstanceLocation = "Normal" | "Skill" | "Burst" | "Extra"

/**
 * A container for a character and its parts (instances, effects, etc)
 */
export class Charbox {
    constructor(private character: Character) { }

    private normals = new MapList<Instance>(s => s.Options.Name)
    private skills = new MapList<Instance>(s => s.Options.Name)
    private bursts = new MapList<Instance>(s => s.Options.Name)
    private tr = new MapList<Instance>(s => s.Options.Name)
    private extra = new MapList<Instance>(s => s.Options.Name)
    private effects = new MapList<Effect>(s => s.Options.Name)

    private party: Party | undefined
    private weapon: Weapon | undefined
    private artifacts: Artbox | undefined
    private modifiers: Modifier[] = []
    readonly Event = new Subject(CharboxEvent.Length(), "CHARBOX_EVENT")

    /** Creates a charbox with given instances and effects */
    static create(options: Options): Charbox {
        const box = new Charbox(options.character)
        box.normals.AddList(options.normals)
        box.skills.AddList(options.skills)
        box.bursts.AddList(options.bursts)
        box.tr.AddList(options.tr)
        box.extra.AddList(options.extra)

        box.effects.AddList(options.effects)
        return box
    }

    /** Gets the character party, if exists */
    GetParty(): Party | undefined {
        return this.party
    }
    /** Sets the character party */
    SetParty(party: Party | undefined): void {
        this.party = party
    }

    /** Gets the character weapon, if exists */
    GetWeapon(): Weapon | undefined {
        return this.weapon
    }

    /** 
     * Changes the character weapon, unequipping the previous one.
     * @param generator The weapon generator to use. NOT a weapon instance.
     * */
    SetWeapon(generator: WeaponGenerator | undefined): Charbox {
        if (this.weapon) {
            this.weapon.Unequip()
        }
        if (generator) {
            this.weapon = generator(this)
        } else {
            this.weapon = undefined
        }
        return this
    }

    /** Gets the character in the box */
    GetCharacter(): Character {
        return this.character
    }

    /** Gets the list of added normals */
    GetNormals(): readonly Instance[] {
        return this.normals.Get()
    }
    /** Finds a normal attack by its name */
    FindNormal(name: string): Instance | undefined {
        return this.normals.Find(name)
    }
    /** Adds an instance to the normals list
     * @returns true if the instance was added
     */
    AddNormal(instance: Instance): boolean {
        return this.normals.Add(instance)
    }
    /** Removes an instance from the normals list */
    RemoveNormal(instance: Instance): boolean {
        return this.normals.Remove(instance)
    }

    /** Gets the list of added skills */
    GetSkills(): readonly Instance[] {
        return this.skills.Get()
    }
    /** Finds a skill by its name */
    FindSkill(name: string): Instance | undefined {
        return this.skills.Find(name)
    }
    /** Adds an instance to the skill list
     * @returns true if the instance was added
     */
    AddSkill(instance: Instance): boolean {
        return this.skills.Add(instance)
    }
    /** Removes an instance from the skill list */
    RemoveSkill(instance: Instance): boolean {
        return this.skills.Remove(instance)
    }

    /** Gets the list of added bursts */
    GetBursts(): readonly Instance[] {
        return this.bursts.Get()
    }
    /** Finds a bursts by its name */
    FindBurst(name: string): Instance | undefined {
        return this.bursts.Find(name)
    }
    /** Adds an instance to the burst list
     * @returns true if the instance was added
     */
    AddBurst(instance: Instance): boolean {
        return this.bursts.Add(instance)
    }
    /** Removes an instance from the burst list */
    RemoveBurst(instance: Instance): boolean {
        return this.bursts.Remove(instance)
    }

    /** Gets the list of added transformative reactions */
    GetTr(): readonly Instance[] {
        return this.tr.Get()
    }
    /** Finds a transformative reaction by its name */
    FindTr(name: string): Instance | undefined {
        return this.tr.Find(name)
    }
    /** Gets the list of added extra instances */
    GetExtra(): readonly Instance[] {
        return this.extra.Get()
    }
    /** Finds a extra damage by its name */
    FindExtra(name: string): Instance | undefined {
        return this.extra.Find(name)
    }

    /** Adds an instance to the extra list
     * @returns true if the instance was added
     */
    AddExtra(instance: Instance): boolean {
        return this.extra.Add(instance)
    }
    /** Removes an instance from the extra list */
    RemoveExtra(instance: Instance): boolean {
        return this.extra.Remove(instance)
    }

    /** Adds a damage instance in an specific location */
    AddInstance(loc: InstanceLocation, instance: Instance): boolean {
        switch (loc) {
            case "Extra":
                return this.AddExtra(instance)
            case "Normal":
                return this.AddNormal(instance)
            case "Skill":
                return this.AddSkill(instance)
            case "Burst":
                return this.AddBurst(instance)
        }
    }
    /** Removes a damage instance from an specific location */
    RemoveInstance(loc: InstanceLocation, instance: Instance): boolean {
        switch (loc) {
            case "Extra":
                return this.RemoveExtra(instance)
            case "Normal":
                return this.RemoveNormal(instance)
            case "Skill":
                return this.RemoveSkill(instance)
            case "Burst":
                return this.RemoveBurst(instance)
        }
    }

    /** Gets all the damage instances */
    GetInstances(): readonly Instance[] {
        return [
            ...this.normals.Get(),
            ...this.skills.Get(),
            ...this.bursts.Get(),
            ...this.tr.Get(),
            ...this.extra.Get()
        ]
    }

    /** Finds an instance by its name */
    FindInstance(name: string): Instance | undefined {
        for (const list of [this.normals, this.skills, this.bursts, this.tr, this.extra]) {
            const found = list.Find(name)
            if (found) {
                return found
            }
        }
        return undefined
    }

    /** Gets the list of effects */
    GetEffects(): readonly Effect[] {
        return [
            ...(this.weapon?.GetEffects() || []),
            ...(this.artifacts?.GetEffects() || []),
            ...this.effects.Get(),
        ]
    }

    /** Gets the list of effects grouped by categories */
    GetGroupedEffects(): [string, readonly Effect[]][] {
        const groups: [string, readonly Effect[]][] = []

        const { weapon, artifacts, party } = this

        if (weapon) {
            groups.push(["WEAPON", weapon.GetEffects()])
        }
        if (artifacts) {
            groups.push(["ARTIFACTS", artifacts.GetEffects()])
        }

        const constellations: Effect[] = []
        const passives: Effect[] = []

        const all = new Set(this.effects.Get())
        for (const ef of all) {
            const name = ef.Options.Name
            if (name.match(/C\d+$/)) {
                constellations.push(ef)
            } else if (name.match(/A\d+$/)) {
                passives.push(ef)
            } else { continue }
            all.delete(ef)
        }
        groups.push(["TALENTS", Array.from(all)])
        groups.push(["PASSIVES", passives])
        groups.push(["CONSTELLATIONS", constellations])

        if (party) {
            groups.push(["RESONANCES", party.GetResonances()])
        }


        return groups
    }

    /** Finds an effect by its name */
    FindEffect(name: string): Effect | undefined {
        let found = this.effects.Find(name)
        if (found) { return found }

        if (this.weapon) {
            found = this.weapon.FindEffect(name)
            if (found) { return found }
        }

        if (this.artifacts) {
            found = this.artifacts.FindEffect(name)
            if (found) { return found }
        }
        return undefined
    }

    /** adds an effect to the character */
    AddEffect(effect: Effect): boolean {
        return this.effects.Add(effect)
    }

    /** Gets the character artifacts box */
    GetArtifacts() {
        return this.artifacts
    }
    /** Sets the character artifact box */
    SetArtifacts(box: Artbox | undefined): Charbox {
        if (this.artifacts) {
            this.artifacts.Remove()
        }
        this.artifacts = box
        return this
    }

    /** Adds a character modifier to the box */
    AddModifier(mod: Modifier): Charbox {
        this.modifiers.unshift(mod)
        return this
    }
    /** Removes a modifier from the box */
    RemoveModifier(mod: Modifier): Charbox {
        const index = this.modifiers.indexOf(mod)
        if (index >= 0) {
            this.modifiers.splice(index, 1)
        }
        return this
    }
    /** List the saved modifiers */
    GetModifiers(): readonly Modifier[] {
        return this.modifiers
    }
    /** removes all modifiers */
    ClearModifiers(): Charbox {
        this.modifiers.forEach(mod => mod.Disable())
        this.modifiers.splice(0, this.modifiers.length)
        return this
    }
}