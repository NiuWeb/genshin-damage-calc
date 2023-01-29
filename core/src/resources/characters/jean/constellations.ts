import { effect, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "JeanC1",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_SKILL_DMG)
        .Values(0.4)
        .Build()
})

export const c3 = effect.Factory({
    Name: "JeanC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "JeanC4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Enemy(stats.stat.ANEMO_RES)
        .Values(-0.4)
        .Build()
})

export const c5 = effect.Factory({
    Name: "JeanC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})
