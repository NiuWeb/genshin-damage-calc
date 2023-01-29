import { effect, stats } from "@src/core"

export const a4 = effect.Factory({
    Name: "NingguangA4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .Where({ owner: { ascension: 4 } })
        .stat
        .Char(stats.stat.GEO_DMG)
        .Values(0.12)
        .Build()
})