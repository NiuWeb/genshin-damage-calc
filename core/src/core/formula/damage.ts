import { TrMultiplier, TrBase, QuickenBonus, TrBonus, CritAvg, Def, Res, AmpBonus } from "./basic"
import { DamageStats, DamageOptions, CritType } from "./options"

/**
 * The complete damage formula including all factors.
 * @param v The final damage stats to use in calculation.
 * @param opt The options object
*/
export function Damage(v: DamageStats, opt: DamageOptions): number {
    /// BASE DAMAGE CALCULATIONS (ADDITIVE)
    let damage = 0.0

    // normal base damage
    if (opt.Base) {
        damage = v.Base
    }

    const trMultiplier = TrMultiplier(opt.Tr)

    // transformative base damage
    damage += trMultiplier * TrBase(v.Char)

    // quicken base damage
    if (trMultiplier === 0 && opt.Quicken > 0) {
        damage += opt.Quicken * TrBase(v.Char) * (1 + QuickenBonus(v.Em) + v.Quicken)
    }

    /// MULTIPLICATIVE CALCULATIONS

    // non-transformative damage bonus
    if (opt.Dmg) {
        damage *= 1 + v.Dmg
    }

    // transformative damage bonus
    if (trMultiplier > 0) {
        damage *= 1 + TrBonus(v.Em) + v.Tr
        // aggravated transformative
        if (opt.Quicken > 0) {
            damage += opt.Quicken * TrBase(v.Char) * (1 + QuickenBonus(v.Em) + v.Quicken)
        }
    }

    // Crit multiplier
    if (opt.Crit === CritType.CRIT) {
        damage *= 1 + v.Critdmg
    } else if (opt.Crit === CritType.CRIT_AVG) {
        damage *= CritAvg(v.Critrate, v.Critdmg)
    }

    // def multiplier
    if (opt.Def) {
        damage *= Def(v.Char, v.Enemy, v.Ignored, v.Reduced)
    }

    // res multiplier
    if (opt.Res) {
        damage *= Res(v.Res)
    }

    // amplifying reaction multiplier
    if (opt.Amp > 0) {
        damage *= opt.Amp * (1 + AmpBonus(v.Em) + v.Amp)
    }

    return damage

}
