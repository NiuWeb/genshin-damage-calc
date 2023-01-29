import { effect, scaling, stats } from "@src/core"

export const c2 = effect.Factory({
    Name: "SaraC2",
    OnApply: new effect.Builder()
        .instance
        .Location("Skill")
        .Options({
            Name: "HIT_C2",
            Element: stats.stat.ELECTRO_DMG,
            Talent: stats.stat.ELEMENTAL_SKILL_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.ELEMENTAL_1,
                    Stat: stats.stat.ATK,
                    Initial: 1.2576 * 0.3,
                    Talent: stats.stat.ELEMENTAL_SKILL_LEVEL,
                },
            ],
        })
        .Build()
})
export const c3 = effect.Factory({
    Name: "SaraC3",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_BURST_LEVEL_UP).
        Values(3).
        Build(),
})
export const c5 = effect.Factory({
    Name: "SaraC5",
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELEMENTAL_SKILL_LEVEL_UP).
        Values(3).
        Build(),
})
export const c6 = effect.Factory({
    Name: "SaraC6",
    ApplyOther: true,
    OnApply: new effect.Builder().
        stat.
        Char(stats.stat.ELECTRO_CRIT_DMG).
        Values(0.6).
        Build(),
})