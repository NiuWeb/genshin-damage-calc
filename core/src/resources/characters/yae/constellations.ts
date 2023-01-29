import { effect, stats } from "@src/core"

export const c3 = effect.Factory({
    Name: "YaeC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "YaeC4",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELECTRO_DMG)
        .Values(0.2)
        .Build()
})

export const c5 = effect.Factory({
    Name: "YaeC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "YaeC6",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.DEFIGNORED)
        .Instance(/HIT_E_\d/i)
        .Values(0.6)
        .Build()
})