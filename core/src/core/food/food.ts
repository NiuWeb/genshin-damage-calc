import type { FoodType, Generator, Options } from "./type"
import type { Charbox } from "../charbox"
import type { Effect } from "../effect"
import { CharboxEvent } from "../charbox/event"
import { EffectEvent, Factory as efFactory } from "../effect"

/** a food contains multiple stat modifiers */
export class Food {
    readonly Name: string
    readonly Type: FoodType
    readonly Stars: number

    constructor(public readonly Options: Options, public readonly Effect: Effect) {
        this.Name = Options.Name
        this.Type = Options.Type
        this.Stars = Options.Stars
    }
    /** Gets the food rank (1 = suspicious, 2 = normal, 3 = delicious) */
    GetRank(): number {
        return this.Effect.GetRank()
    }

    /** Sets the food rank (1 = suspicious, 2 = normal, 3 = delicious) */
    SetRank(rank: number): void {
        // clamp rank
        rank = Math.max(1, Math.min(3, rank))
        this.Effect.SetRank(rank)
    }

    /** unapplies the food from all characters */
    Unapply() {
        this.Effect.Disable()
        this.Effect.UnapplyAll()
    }
}

/**
 * Creates a generator function for foods using the given options
 */
export function Factory(options: Options): Generator {
    const effects = options.Effects
    const efGenerator = efFactory({
        Name: options.Name,
        ApplyOther: true,
        MaxRank: 3,
        OnApply(target, ef, reg) {
            // create modifiers
            const mods = effects.map(([stat]) => (
                reg.Modifier(target.GetCharacter().CreateModifier(stat, 0))
            ))

            // update modifier values per rank
            const update = () => {
                const rank = ef.GetRank()
                for (let i = 0; i < effects.length; i++) {
                    const [, min, max] = effects[i]
                    //x0 = 1, y0 = min; x1 = 3, y1 = max
                    const value = min + (max - min) * (rank - 1) / 2
                    mods[i].SetValue(value)
                }
            }

            update()

            // update modifiers when rank changes
            reg.Observer(ef.Event.CreateObserver(EffectEvent.CHANGE_RANK, update))


            // automatically apply to the entire party every time the party changes
            reg.Observer(target.Event.CreateObserver(CharboxEvent.CHANGE_PARTY, () => {
                const party = target.GetParty()
                if (!party) {
                    return
                }
                const applied = ef.GetTargets()
                const members = party.GetMembers()

                for (const char of members) {
                    if (!applied.includes(char)) {
                        ef.Apply(char)
                    }
                }
            }))

            return () => 0
        }
    })

    return Object.assign(function generator(target: Charbox): Food {
        const ef = efGenerator(target)
        ef.Enable()
        ef.Apply(target)

        // apply to the entire party, if party exists
        const party = target.GetParty()
        if (party) {
            for (const char of party.GetMembers()) {
                if (char !== target) {
                    ef.Apply(char)
                }
            }
        }

        return new Food(options, ef)
    }, { ...options, Options: options })
}