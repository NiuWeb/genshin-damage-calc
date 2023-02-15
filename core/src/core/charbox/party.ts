import type { Effect } from "@core/effect"
import { Character } from "@core/character"
import { Charbox } from "./charbox"
import { CharboxEvent } from "./event"
import { Elements } from "@core/stats"
import { FindByElement } from "@src/resources/resonances"
import { EnemyConnector } from "@core/enemy"
import { region } from "@core/stats"
import { MapList } from "@src/utils/lists/list"
import { Foodbox } from "../food"

/** A party is a groups of characters */
export class Party {
    constructor(...members: Charbox[]) {
        this.handler = new Charbox(new Character({
            Name: "__party__",
            Region: region.NONE,
            Stars: 4,
            Element: 0,
            Weapon: 0,
            BurstCost: 0,
        }))
        this.handler.SetParty(this)

        this.foods = new Foodbox(this.handler)

        members.forEach(member => this.Add(member))
    }
    /** An additional empty character that will be the owner of elemental resonances */
    private handler: Charbox

    /** foods store */
    private foods: Foodbox

    private members = new MapList<Charbox>(c => c.GetCharacter().Options.Name)
    private resonances: Effect[] = []
    private enemies = new EnemyConnector()

    /** Gets the list of effects that are applied to the given member */
    GetAppliedEffects(member: Charbox): readonly Effect[] {
        return this
            .GetAllEffects()
            .filter(effect => (
                effect.GetTargets().includes(member)
            ))
    }

    /** Gets the resonance effects in the party */
    GetResonances(): readonly Effect[] {
        return this.resonances
    }
    /** Gets ALL effects in the party, including character and resonances */
    GetAllEffects(): readonly Effect[] {
        const result: Effect[] = []
        this.members.Get().forEach(member => (
            member.GetEffects().forEach(ef => result.push(ef))
        ))
        this.resonances.forEach(ef => result.push(ef))
        return result
    }
    /** Find all the effects with a given name */
    FindEffects(name: string): Effect[] {
        name = name.toLowerCase()
        return this.GetAllEffects().filter(ef => ef.Options.Name.toLowerCase() === name)
    }
    /** 
     * Adds a member to the party if it doesn't exists.
     * Also removes the member from its previous party 
     * Returns true if member was added 
     */
    Add(member: Charbox): boolean {
        if (this.members.Get().length >= 4) {
            return false
        }
        if (this.members.Has(member)) {
            return false
        }
        const oldParty = member.GetParty()
        if (oldParty) {
            oldParty.Remove(member)
        }
        member.SetParty(this)
        this.members.Add(member)
        this.updateResonances()
        this.members.Get().forEach(member => member.Event.Notify(CharboxEvent.CHANGE_PARTY))
        this.enemies.Add(member.GetCharacter().GetEnemy())
        return true
    }

    /** Removes a member from the party. Return true if it was found and removed */
    Remove(member: Charbox): boolean {
        this.members.Remove(member)
        member.SetParty(undefined)
        this.updateResonances()
        this.members.Get().forEach(member => member.Event.Notify(CharboxEvent.CHANGE_PARTY))
        member.Event.Notify(CharboxEvent.CHANGE_PARTY)
        this.enemies.Remove(member.GetCharacter().GetEnemy())
        return true
    }
    /** Gets the members in the party */
    GetMembers(): readonly Charbox[] {
        return this.members.Get()
    }

    /** Finds a member by its name */
    FindMember(name: string): Charbox | undefined {
        return this.members.Find(name)
    }

    /** Gets the foods box of the party */
    GetFoods(): Foodbox {
        return this.foods
    }

    /** Update the resonance effects */
    private updateResonances() {
        /** remove previously created effects */
        this.resonances.forEach(ef => ef.Disable().UnapplyAll())
        this.resonances = []

        /** resonances only work with 4-member parties */
        if (this.members.Get().length < 4) {
            return
        }

        /** number of members per element */
        const n_elements: { [x: number]: number } = {}
        Elements.forEach(el => n_elements[el] = 0)
        this.members.Get().forEach(member => (
            n_elements[member.GetCharacter().Options.Element]++
        ))

        /** elements to load resonances */
        const resonances: number[] = []
        Elements.forEach(el => {
            if (n_elements[el] >= 2) {
                resonances.push(el)
            }
        })

        /** load effect generators */
        const generators = resonances
            .map(el => FindByElement(el))
            .filter(res => !!res)

        /** instanciate the effects */
        generators.forEach(gens => (
            gens?.forEach(gen => {
                const ef = gen(this.handler)
                ef.Enable()
                this.members.Get().forEach(member => ef.Apply(member))
                this.resonances.push(ef)
            })
        ))
    }
}