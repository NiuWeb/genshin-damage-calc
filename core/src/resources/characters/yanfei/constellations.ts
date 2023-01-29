import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "YanfeiC2",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.CHARGED_ATTACK_CRIT_RATE)
        .Values(0.2)
        .Build()
})

export const c3 = effect.Factory({
    Name: "YanfeiC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})
export const c5 = effect.Factory({
    Name: "YanfeiC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})