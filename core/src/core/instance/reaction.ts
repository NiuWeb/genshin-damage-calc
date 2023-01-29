import { Enemy } from "@core/enemy"
import { AmpType, QuickenType } from "@core/formula/options"
import { aura, stat } from "@core/stats"

/** 
 * Gets the corresponding stat and multiplier for amplifying reaction (vape, melt) 
 * @return [stat (vape_dmg/melt_dmg), type (strong/weak)]
 */
export function GetAmp(element: number, enemy: Enemy): [number, AmpType] {
    if (element === stat.HYDRO_DMG && enemy.Affected(stat.PYRO_DMG)) {
        return [stat.VAPORIZE_DMG, AmpType.AMP_STRONG]
    } else if (element === stat.PYRO_DMG && enemy.Affected(stat.CRYO_DMG)) {
        return [stat.MELT_DMG, AmpType.AMP_STRONG]
    } else if (element === stat.PYRO_DMG && enemy.Affected(stat.HYDRO_DMG)) {
        return [stat.VAPORIZE_DMG, AmpType.AMP_WEAK]
    } else if (element === stat.CRYO_DMG && enemy.Affected(stat.PYRO_DMG)) {
        return [stat.MELT_DMG, AmpType.AMP_WEAK]
    }

    return [stat.NONE, AmpType.AMP_NONE]
}

/** 
 * Gets the corresponding stat and multiplier for quicken reaction (spread, aggravate) 
 * @return [stat (aggravate/spread), type (strong/weak)]
 */
export function GetQuicken(element: number, enemy: Enemy): [number, QuickenType] {
    if (!enemy.HasAura(aura.QUICKEN)) {
        return [stat.NONE, QuickenType.QUICKEN_NONE]
    }

    if (element === stat.ELECTRO_DMG) {
        return [stat.AGGRAVATE_DMG, QuickenType.QUICKEN_WEAK]
    } else if (element === stat.DENDRO_DMG) {
        return [stat.SPREAD_DMG, QuickenType.QUICKEN_STRONG]
    }

    return [stat.NONE, QuickenType.QUICKEN_NONE]
}
