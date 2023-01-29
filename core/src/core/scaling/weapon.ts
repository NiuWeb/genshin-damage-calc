import { WeaponScaling, WEAPON_ATK_BASE, WEAPON_ATK_BASE_ASCENSION_3, WEAPON_ATK_BASE_ASCENSION_4, WEAPON_ATK_BASE_ASCENSION_5, WEAPON_SUBSTAT_INITIAL, WEAPON_SUBSTAT_SCALING } from "./weapon_data"

/**
 * Gets the ATK Base of a weapon given its attributes.
 * @param stars weapon stars, can be 3, 4 or 5.
 * @param scaling the scaling constant, defined by its initial atk base.
 * @param level weapon level, between 1 and 90.
 * @param ascension weapon ascension, between 0 and 6.
*/
export function GetWeaponAtkBase(stars: number, scaling: WeaponScaling, level: number, ascension: number): number {
    if (level < 1 || level > 90) {
        throw new Error("Weapon level must be between 1 and 90")
    }
    if (ascension < 0 || ascension > 6) {
        throw new Error("Weapon ascension must be between 0 and 6")
    }

    let asc_value: number
    if (stars === 5) {
        asc_value = WEAPON_ATK_BASE_ASCENSION_5
    } else if (stars === 4) {
        asc_value = WEAPON_ATK_BASE_ASCENSION_4
    } else if (stars === 3) {
        asc_value = WEAPON_ATK_BASE_ASCENSION_3
    } else {
        throw new Error("Weapon stars must be 3, 4 or 5.")
    }

    return WEAPON_ATK_BASE[scaling][level - 1] + asc_value * ascension
}

/** Gets the value of a weapon substat for the given level */
export function GetWeaponSubstat(scaling: WeaponScaling, level: number, substat: number): number {
    const multiplier = WEAPON_SUBSTAT_SCALING[level - 1]
    const initial = WEAPON_SUBSTAT_INITIAL[scaling][substat] || 0
    return initial * multiplier
}
