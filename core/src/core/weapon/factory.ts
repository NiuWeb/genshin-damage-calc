import type { Generator as EffectGenerator } from "@core/effect"
import type { Charbox } from "@core/charbox"
import type { WeaponScaling } from "@core/scaling"
import { Weapon } from "./weapon"

/** Options for creating weapons */
export interface Options {
    /** Weapon type */
    Type: number
    /** Weapon name */
    Name: string
    /** Weapon stars */
    Stars: number
    /** Weapon effects */
    Effects: EffectGenerator[]
    /** Weapon scaling identifier */
    Scaling: WeaponScaling
    /** Weapon substat */
    Substat: number
}
/** A weapon generator instanciates a weapon */
export interface Generator extends Readonly<Options> {
    (target: Charbox): Weapon
}

/** Creates a weapon generator with the given options */
export function Factory(options: Options): Generator {
    return Object.assign(function generator(target: Charbox): Weapon {
        const effects = options.Effects.map(gen => gen(target).Enable())
        return  new Weapon(options, effects).Equip(target)
    }, options)
}