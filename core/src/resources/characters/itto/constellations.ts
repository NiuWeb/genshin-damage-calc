import { effect, stats } from "@src/core"

export const c3 = effect.Factory({
    Name: "IttoC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "IttoC4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.DEF_PERCENT, stats.stat.ATK_PERCENT)
        .Values(0.20)
        .Build()
})

export const c5 = effect.Factory({
    Name: "IttoC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "IttoC6",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.CHARGED_ATTACK_CRIT_DMG)
        .Values(0.7)
        .Build()
})