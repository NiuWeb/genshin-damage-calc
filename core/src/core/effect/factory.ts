import type { Charbox } from "../charbox"
import type { Options, Generator } from "./type"
import { Effect } from "./effect"

/**
 * Creates a generator function for effects using the given options
 * @param options The effect options
 * @returns The effect generator that will instanciate the effect for the given owner
 */
export function Factory(options: Options): Generator {
    const opts: Required<Options> = {
        ApplySelf: true,
        ApplyOther: false,
        StackSelf: false,
        MaxTargets: 0,
        Conditions: [],
        MaxConditions: 0,
        MaxAuras: 0,
        ValidAuras: [],
        MaxRank: 1,
        MaxStacks: 0,
        ...options,
    }
    // create all conditions as uppercase
    opts.Conditions = opts.Conditions.map(cond => cond.toUpperCase())
    return Object.assign(function generator(owner: Charbox): Effect {
        return new Effect(opts, owner)
    }, { ...options, Options: options })
}