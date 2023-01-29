import type { Charbox } from "@core/charbox"
import type { Register } from "./register/register"
import type { Effect } from "./effect"

/** Configurations for an effect */
export interface Options {
    /** Effect name */
    Name: string
    /** can the effect be applied to the owner? Default `true` */
    ApplySelf?: boolean
    /** can be the effect be applied to other character rather than the owner? Default `false` */
    ApplyOther?: boolean
    /** 
     * Can multiple instances of this effect (or any other effect with the exact same name) 
     * be applied to the same target in a party? Default `false`
    */
    StackSelf?: boolean
    /** maximum of targets the effect can have. Default `Infinity` */
    MaxTargets?: number
    /** List of possible conditions */
    Conditions?: readonly string[]
    /** Maximum concurrent conditions. Default `0` */
    MaxConditions?: number
    /** Maxmum concurrent elemental auras. Default `0` */
    MaxAuras?: number
    /** List of auras that can be applied to this effect. Default any aura */
    ValidAuras?: readonly number[]
    /** Maximum effect rank. Default `1` */
    MaxRank?: number
    /** Maximum effect stacks. Default `0` */
    MaxStacks?: number

    /**
     * The effect body function that triggers when the effect
     * is applied to a character.
     * The body function returns another function, the one that
     * will be triggered when the effect is unapplied.
    */
    OnApply(charbox: Charbox, effect: Effect, register: Register): () => void
}

/** A generator is a function that instanciates an effect, it exposes the effect properties */
export interface Generator extends Omit<Readonly<Options>, "OnApply"> {
    /** Instanciates the effect */
    (owner: Charbox): Effect
    /** effect options */
    readonly Options: Omit<Readonly<Options>, "OnApply">
}
