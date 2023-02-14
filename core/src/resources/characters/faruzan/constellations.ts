import { effect, stats } from "@src/core"

export const c3 = effect.Factory({
    Name: "FaruzanC3",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
        .Values(3)
        .Build()
})

export const c5 = effect.Factory({
    Name: "FaruzanC5",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .Values(3)
        .Build()
})

export const c6 = effect.Factory({
    Name: "FaruzanC6",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ANEMO_CRIT_DMG)
        .Values(0.4)
        .Build()
})