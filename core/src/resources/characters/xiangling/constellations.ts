import { effect, scaling, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "XianglingC1",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Enemy(stats.stat.PYRO_RES)
        .Values(-0.15)
        .Build()
})

export const c2 = effect.Factory({
    Name: "XianglingC2",
    OnApply: new effect.Builder()
        .instance
        .Options({
            Name: "HIT_C2",
            Element: stats.stat.PYRO_DMG,
            Talent: stats.stat.NONE,
            Scaling: [{
                Stat: stats.stat.ATK,
                Initial: 0.75,
                Scaling: scaling.TalentScaling.NONE,
                Talent: stats.stat.NONE,
            }]
        })
        .Build()
})

export const c3 = effect.Factory({
    Name: "XianglingC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "XianglingC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "XianglingC6",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.PYRO_DMG)
        .Values(0.15)
        .Build()
})