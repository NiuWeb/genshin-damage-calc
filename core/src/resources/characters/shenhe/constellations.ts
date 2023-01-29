import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "ShenheC2",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.CRYO_CRIT_DMG)
        .Values(0.15)
        .Build()
})

export const c3 = effect.Factory({
    Name: "ShenheC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "ShenheC4",
    MaxStacks: 50,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_SKILL_DMG)
        .Values(0.05)
        .Stacks()
        .Build()
})

export const c5 = effect.Factory({
    Name: "ShenheC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})