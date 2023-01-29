import { effect, scaling, stats } from "@src/core"

export const c1 = effect.Factory({
    Name: "FischlC1",
    OnApply: new effect.Builder()
        .instance
        .Options({
            Name: "HIT_C1",
            Element: stats.stat.PHYSICAL_DMG,
            Talent: stats.stat.NORMAL_ATTACK_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.NONE,
                    Stat: stats.stat.ATK,
                    Initial: 0.22,
                    Talent: stats.stat.NONE,
                },
            ],
        })
        .Build()
})

export const c2 = effect.Factory({
    Name: "FischlC2",
    OnApply: new effect.Builder()
        .mv
        .Mv(stats.stat.ATK, 2, /HIT_E$/)
        .Build()
})

export const c3 = effect.Factory({
    Name: "FischlC3",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})

export const c4 = effect.Factory({
    Name: "FischlC4",
    OnApply: new effect.Builder()
        .instance
        .Options({
            Name: "HIT_C4",
            Element: stats.stat.ELECTRO_DMG,
            Talent: stats.stat.ELEMENTAL_BURST_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.NONE,
                    Stat: stats.stat.ATK,
                    Initial: 2.22,
                    Talent: stats.stat.NONE,
                },
            ],
        })
        .Build()
})


export const c5 = effect.Factory({
    Name: "FischlC5",
    ApplySelf: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})


export const c6 = effect.Factory({
    Name: "FischlC6",
    OnApply: new effect.Builder()
        .instance
        .Options({
            Name: "HIT_C6",
            Element: stats.stat.ELECTRO_DMG,
            Talent: stats.stat.ELEMENTAL_SKILL_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.NONE,
                    Stat: stats.stat.ATK,
                    Initial: 0.3,
                    Talent: stats.stat.NONE,
                },
            ],
        })
        .Build()
})