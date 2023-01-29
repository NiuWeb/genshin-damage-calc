import { effect, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "EulaC1",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.PHYSICAL_DMG)
        .Values(0.3)
        .Build()
})

export const c3 = effect.Factory({
    Name: "EulaC3",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "EulaC4",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_BURST_DMG)
        .Values(0.25)
        .Build()
})

export const c5 = effect.Factory({
    Name: "EulaC5",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})
