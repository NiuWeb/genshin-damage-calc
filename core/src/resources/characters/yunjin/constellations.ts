import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "YunjinC2",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.NORMAL_ATTACK_DMG)
        .Values(0.15)
        .Build()
})

export const c3 = effect.Factory({
    Name: "YunjinC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "YunjinC4",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.DEF_PERCENT)
        .Values(0.2)
        .Build()
})

export const c5 = effect.Factory({
    Name: "YunjinC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})
