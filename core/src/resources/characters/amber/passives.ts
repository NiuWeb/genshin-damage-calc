import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "AmberA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .stat
        .Char(stats.stat.ELEMENTAL_BURST_CRIT_RATE)
        .Values(0.1)
        .Build()
})

export const a4 = effect.Factory({
    Name: "AmberA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .stat
        .Char(stats.stat.ATK_PERCENT)
        .Values(0.15)
        .Build()
})