import { effect, scaling, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "YelanC2",
    OnApply: new effect.Builder()
        .instance
        .Options(
            {
                Name: "HIT_C2",
                Element: stats.stat.HYDRO_DMG,
                Talent: stats.stat.ELEMENTAL_BURST_DMG,
                Scaling: [
                    {
                        Scaling: scaling.TalentScaling.ELEMENTAL_1,
                        Stat: stats.stat.HP,
                        Initial: 0.14,
                        Talent: stats.stat.ELEMENTAL_BURST_LEVEL,
                    },
                ],
            },)
        .Build()
})

export const c3 = effect.Factory({
    Name: "YelanC3",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "YelanC4",
    MaxStacks: 4,
    ApplySelf: true,
    ApplyOther: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.HP_PERCENT).
        Values(0.1).
        Stacks().
        Build(),
})

export const c5 = effect.Factory({
    Name: "YelanC5",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})


export const c6 = effect.Factory({
    Name: "YelanC6",
    OnApply: new effect.Builder()
        .instance
        .Options({
            Name: "HIT_C6",
            Element: stats.stat.HYDRO_DMG,
            Talent: stats.stat.CHARGED_ATTACK_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.ELEMENTAL_1,
                    Stat: stats.stat.HP,
                    Initial: 1.56 * 0.1158,
                    Talent: stats.stat.NORMAL_ATTACK_LEVEL,
                },
            ],
        })
        .Build()
})