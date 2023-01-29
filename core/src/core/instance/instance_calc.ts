import type { Instance } from "./instance"
import { Damage } from "@core/formula"
import { AmpType, CritType, DamageOptions, DamageStats, QuickenType } from "@core/formula/options"
import { stat } from "@core/stats"
import { DmgToRes } from "@core/stats/conversions"
import { GetQuicken, GetAmp } from "./reaction"

/** Computes the damage stats and options to calculate instance damage */
export function damageParams(ins: Instance, reaction: boolean, crit: CritType): { stats: DamageStats, options: DamageOptions } {
    const element = ins.GetElement()
    const talent = ins.Options.Talent
    const enemy = ins.Character.GetEnemy()

    const [quiS, quiT] = GetQuicken(element, enemy)
    const [ampS, ampT] = GetAmp(element, enemy)

    const stats = DamageStats({
        Char: ins.Character.Get(stat.LEVEL),
        Enemy: enemy.Subject.Get(stat.LEVEL),
        Base: ins.Base.Compute() + ins.Get(stat.DMG_FLAT),
        Dmg: ins.Get(element) + ins.Get(talent) + ins.Get(stat.ALL_DMG),
        Critrate: Math.max(0, Math.min(1, ins.Get(stat.CRIT_RATE))),
        Critdmg: ins.Get(stat.CRIT_DMG),
        Em: ins.Get(stat.ELEMENTAL_MASTERY),
        Res: enemy.Subject.Get(DmgToRes(element)),
        Ignored: ins.Get(stat.DEFIGNORED) + enemy.Subject.Get(stat.DEFIGNORED),
        Reduced: ins.Get(stat.DEFREDUCTION) + enemy.Subject.Get(stat.DEFREDUCTION),
        Quicken: ins.Get(quiS),
        Amp: ins.Get(ampS),
        Tr: ins.Get(ins.Options.Tr),
    })
    const options = DamageOptions({
        Base: ins.Options.Base,
        Def: ins.Options.Def,
        Res: ins.Options.Res,
        Dmg: ins.Options.Dmg,
        Crit: crit,
        Quicken: quiT,
        Tr: ins.Options.Tr,
        Amp: ampT,
    })

    if (!reaction) {
        stats.Quicken = 0
        stats.Amp = 0
        options.Quicken = QuickenType.QUICKEN_NONE
        options.Amp = AmpType.AMP_NONE
    }
    if (!ins.Options.Amp) {
        options.Amp = AmpType.AMP_NONE
    }
    if (!ins.Options.Quicken) {
        options.Quicken = QuickenType.QUICKEN_NONE
    }
    if (!ins.Options.Crit) {
        options.Crit = CritType.NO_CRIT
    }
    return { stats, options }
}

/** Calculates the damage of a single instance */
export function calculate(ins: Instance, reaction: boolean, crit: CritType): number {
    const { stats, options } = damageParams(ins, reaction, crit)
    return Damage(stats, options)
}