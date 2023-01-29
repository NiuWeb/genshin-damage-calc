import { effect, scaling, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "AmberC1",
    OnApply: new effect.Builder()
        .instance
        .Location("Normal")
        .Options({
            Name: "HIT_C1",
            Element: stats.stat.PYRO_DMG,
            Talent: stats.stat.CHARGED_AIMED_SHOT_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.ELEMENTAL_1,
                    Talent: stats.stat.NORMAL_ATTACK_LEVEL,
                    Stat: stats.stat.ATK,
                    Initial: 1.24 * 0.2,
                },
            ],
        })
        .Build()
})

export const c2 = effect.Factory({
    Name: "AmberC2",
    OnApply: new effect.Builder()
        .mv
        .Mv(stats.stat.ATK, 2, /hit_e/i)
        .Build()
})

export const c3 = effect.Factory({
    Name: "AmberC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "AmberC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "AmberC6",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ATK_PERCENT)
        .Values(0.15)
        .Build()
})