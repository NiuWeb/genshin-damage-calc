import { stat } from "@core/stats"
import { TRANSFORMATIVE } from "@core/scaling"


// Total value for a stat like ATK, DEF or HP
export function TotalStat(base: number, percent: number, flat: number): number {
    return base * (1 + percent) + flat
}

// Average CRIT damage basic calculation
export function CritAvg(critrate: number, critdmg: number): number {
    if (critrate > 1) {
        critrate = 1
    } else if (critrate < 0) {
        critrate = 0
    }
    return 1 + critrate * critdmg
}

// RES multiplier
export function Res(res: number): number {
    if (res < 0) {
        return 1 - res / 2
    } else if (res < 0.75) {
        return 1 - res
    } else {
        return 1 / (4 * res + 1)
    }
}

/*
DEF multiplier

- char: character level

- enemy: enemy level

- ignored: DEF ignored

- reduced: DEF reduction
*/
export function Def(char: number, enemy: number, ignored: number, reduced: number): number {
    return (char + 100) / ((1 - ignored) * (1 - reduced) * (enemy + 100) + char + 100)
}

// Amplifying reaction DMG bonus provided by EM
export function AmpBonus(em: number): number {
    return 2.78 * em / (em + 1400)
}

// Transformative reaction DMG bonus provided by EM
export function TrBonus(em: number): number {
    return 16 * em / (em + 2000)
}

// Quicken reaction DMG bonus provided by EM
export function QuickenBonus(em: number): number {
    return 5 * em / (em + 1200)
}

// Transformative base damage provided by character level
export function TrBase(char: number): number {
    return TRANSFORMATIVE[char - 1]
    /*if (char <= 60) {
        return 0.0002325 * (char * char * char) + 0.05547 * (char * char) - 0.2523 * char + 14.47
    } else {
        return 0.00194 * (char * char * char) - 0.319 * (char * char) + 30.7 * char - 868
    }*/
}

// Calculates the base multiplier for the given transformative reaction
export function TrMultiplier(reaction: number): number {
    switch (reaction) {
        case stat.BURGEON_DMG:
            return 6
        case stat.HYPERBLOOM_DMG:
            return 6
        case stat.OVERLOAD_DMG:
            return 4
        case stat.BLOOM_DMG:
            return 4
        case stat.SHATTER_DMG:
            return 3
        case stat.ELECTROCHARGE_DMG:
            return 2.4
        case stat.SWIRL_DMG:
            return 1.2
        case stat.SUPERCONDUCT_DMG:
            return 1
        case stat.BURNING_DMG:
            return 0.5

        case stat.AGGRAVATE_DMG:
            return 2.3
        case stat.SPREAD_DMG:
            return 2.5
    }
    return 0
}
