import { effect, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "GanyuA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .stat
        .Char(stats.stat.CRIT_RATE)
        .Instance(/Frostflake/i)
        .Values(0.2)
        .Build()
})

export const a4 = effect.Factory({
    Name: "GanyuA4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 4 } })
        .stat
        .Char(stats.stat.CRYO_DMG)
        .Values(0.2)
        .Build()
})