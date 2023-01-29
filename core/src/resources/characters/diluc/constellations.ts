import { effect, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "DilucC1",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ALL_DMG)
        .Values(0.15)
        .Build()
})

export const c2 = effect.Factory({
    Name: "DilucC2",
    MaxStacks: 3,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ATK_PERCENT)
        .Values(0.1)
        .Stacks()
        .Build()
})

export const c3 = effect.Factory({
    Name: "DilucC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "DilucC4",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_SKILL_DMG)
        .Values(0.4)
        .Build()
})

export const c5 = effect.Factory({
    Name: "DilucC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "DilucC6",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.NORMAL_ATTACK_DMG)
        .Values(0.3)
        .Build()
})