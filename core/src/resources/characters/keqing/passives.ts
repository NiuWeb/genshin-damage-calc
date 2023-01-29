import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "KeqingA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .infusion
        .Set(stats.stat.ELECTRO_DMG, false)
        .Build()
})

export const a4 = effect.Factory({
    Name: "KeqingA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .stat
        .Char(stats.stat.CRIT_RATE, stats.stat.ENERGY_RECHARGE)
        .Values(0.15)
        .Build()
})