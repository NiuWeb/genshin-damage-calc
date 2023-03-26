import { effect, stats } from "@src/core"

export const c3 = effect.Factory({
    Name: "MikaC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})
export const c5 = effect.Factory({
    Name: "MikaC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "MikaC6",
    ApplyOther: true,
    MaxTargets: 1,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.PHYSICAL_CRIT_DMG)
        .Values(0.6)
        .Build()
})