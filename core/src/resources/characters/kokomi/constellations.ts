import { effect, scaling, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "KokomiC1",
    OnApply: new effect.Builder()
        .instance
        .Options({
            Name: "HIT_C1",
            Element: stats.stat.HYDRO_DMG,
            Talent: stats.stat.NONE,
            Scaling: [{
                Stat: stats.stat.HP,
                Initial: 0.3,
                Talent: stats.stat.NONE,
                Scaling: scaling.TalentScaling.NONE,
            }]
        })
        .Build()
})

export const c3 = effect.Factory({
    Name: "KokomiC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "KokomiC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})


export const c6 = effect.Factory({
    Name: "KokomiC6",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.HYDRO_DMG)
        .Values(0.4)
        .Build()
})