import type { FoodType, Generator, Options } from "./type"
import { Charbox, CharboxEvent } from "../charbox"
import * as effect from "../effect"

/** a food contains multiple stat modifiers */
export class Food {
    readonly Name: string
    readonly Type: FoodType
    constructor(public readonly Options: Options, public readonly Effect: effect.Effect) {
        this.Name = Options.Name
        this.Type = Options.Type
    }

    /** unapplies the food from all characters */
    Unapply() {
        this.Effect.UnapplyAll()
    }
}

/**
 * Creates a generator function for foods using the given options
 */
export function Factory(options: Options): Generator {
    const efGenerator = effect.Factory({
        Name: options.Name,
        ApplyOther: true,
        OnApply(target, ef, reg) {
            for (const [stat, value] of options.Effects) {
                reg.Modifier(target.GetCharacter().CreateModifier(stat, value))
            }

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