import { effect, scaling, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "YoimiyaC1",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ATK_PERCENT)
        .Values(0.2)
        .Build()
})
export const c2 = effect.Factory({
    Name: "YoimiyaC2",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.PYRO_DMG)
        .Values(0.25)
        .Build()
})

export const c3 = effect.Factory({
    Name: "YoimiyaC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c5 = effect.Factory({
    Name: "YoimiyaC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c6 = effect.Factory({
    Name: "YoimiyaC6",
    OnApply: new effect.Builder()
        .instance
        .Location("Normal")
        .Options({
            Name: "HIT_C6",
            Element: stats.stat.PYRO_DMG,
            Talent: stats.stat.NORMAL_ATTACK_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.ELEMENTAL_1,
                    Stat: stats.stat.ATK,
                    Talent: stats.stat.NORMAL_ATTACK_LEVEL,
                    Initial: 0.164 * 0.6,
                },
            ],
        })
        .Build()
})