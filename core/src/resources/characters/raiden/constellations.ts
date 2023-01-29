import { effect, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "RaidenC2",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.DEFIGNORED)
        .Values(0.6)
        .Build()
})

export const c3 = effect.Factory({
    Name: "RaidenC3",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .Values(3)
        .Build()
})
export const c4 = effect.Factory({
    Name: "RaidenC4",
    ApplyOther: true,
    ApplySelf: false,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ATK_PERCENT)
        .Values(0.3)
        .Build()
})
export const c5 = effect.Factory({
    Name: "RaidenC5",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
        .Values(3)
        .Build()
})