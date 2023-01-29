import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "XiaoC2",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ENERGY_RECHARGE)
        .Values(0.25)
        .Build()
})

export const c3 = effect.Factory({
    Name: "XiaoC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "XiaoC4",
    OnApply: new effect.Builder()
        .Where({ target: { hp: { leq: 0.5 } } })
        .stat
        .Char(stats.stat.DEF_PERCENT)
        .Values(1)
        .Build()
})

export const c5 = effect.Factory({
    Name: "XiaoC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})