import { effect, stats } from "@src/core"

export const ForestSanctuary = (Name: string) => effect.Factory({
    Name,
    MaxRank: 5,
    ApplyOther: true,
    MaxTargets: 1,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_MASTERY)
        .Values(60, 75, 90, 105, 120)
        .Build()
})