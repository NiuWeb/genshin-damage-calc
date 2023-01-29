import { effect, scaling, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "FischlA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .instance
        .Options({
            Name: "HIT_A1",
            Element: stats.stat.ELECTRO_DMG,
            Talent: stats.stat.CHARGED_AIMED_SHOT_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.ELEMENTAL_1,
                    Stat: stats.stat.ATK,
                    Initial: 1.24 * 1.527,
                    Talent: stats.stat.NORMAL_ATTACK_LEVEL,
                },
            ],
        })
        .Build()
})
export const a4 = effect.Factory({
    Name: "FischlA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .instance
        .Options({
            Name: "HIT_A4",
            Element: stats.stat.ELECTRO_DMG,
            Talent: stats.stat.ELEMENTAL_SKILL_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.NONE,
                    Stat: stats.stat.ATK,
                    Initial: 0.8,
                    Talent: stats.stat.NONE,
                },
            ],
        })
        .Build()
})