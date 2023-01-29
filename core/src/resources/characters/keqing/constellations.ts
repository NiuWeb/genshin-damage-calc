import { effect, scaling, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "KeqingC1",
    OnApply: new effect.Builder()
        .instance
        .Options({
            Name: "HIT_C1",
            Element: stats.stat.ELECTRO_DMG,
            Talent: stats.stat.NONE,
            Scaling: [{
                Stat: stats.stat.ATK,
                Initial: 0.5,
                Scaling: scaling.TalentScaling.NONE,
                Talent: stats.stat.NONE
            }]
        })
        .Build()
})

export const c3 = effect.Factory({
    Name: "KeqingC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "KeqingC4",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ATK_PERCENT)
        .Values(0.25)
        .Build()
})

export const c5 = effect.Factory({
    Name: "KeqingC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "KeqingC6",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELECTRO_DMG)
        .Values(0.06)
        .Build()
})