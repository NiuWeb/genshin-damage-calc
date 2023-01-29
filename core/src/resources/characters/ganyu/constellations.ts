import { effect, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "GanyuC1",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Enemy(stats.stat.CRYO_RES)
        .Values(-0.15)
        .Build()
})

export const c3 = effect.Factory({
    Name: "GanyuC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "GanyuC4",
    ApplyOther: true,
    MaxStacks: 5,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ALL_DMG)
        .Values(0.05)
        .Stacks()
        .Build()
})

export const c5 = effect.Factory({
    Name: "GanyuC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})