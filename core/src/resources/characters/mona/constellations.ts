import { effect, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "MonaC1",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELECTROCHARGE_DMG, stats.stat.VAPORIZE_DMG)
        .Values(0.15)
        .Next()

        .stat
        .Char(stats.stat.ALL_DMG)
        .Instance("HIT_SWIRL_HYDRO")
        .Values(0.15)
        .Build()
})

export const c3 = effect.Factory({
    Name: "MonaC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "MonaC4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.CRIT_RATE)
        .Values(0.15)
        .Build()
})

export const c5 = effect.Factory({
    Name: "MonaC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "MonaC6",
    MaxStacks: 3,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.CHARGED_ATTACK_DMG)
        .Values(0.6)
        .Stacks()
        .Build()
})
