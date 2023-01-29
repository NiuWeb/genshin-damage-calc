import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E,
        Element: stats.stat.DENDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.936,
            },
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ELEMENTAL_MASTERY,
                Initial: 1.5488,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_DOT + "_1",
        Element: stats.stat.DENDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.672,
            },
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ELEMENTAL_MASTERY,
                Initial: 1.344,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_DOT + "_2",
        Element: stats.stat.DENDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.672 * 2,
            },
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ELEMENTAL_MASTERY,
                Initial: 1.344 * 2,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_DOT + "_3",
        Element: stats.stat.DENDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.672 * 3,
            },
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ELEMENTAL_MASTERY,
                Initial: 1.344 * 3,
            },
        ],
    },
]

export const eBonus = effect.Factory({
    Name: "AlhaithamE",
    OnApply: new effect.Builder()
        .infusion
        .Set(stats.stat.DENDRO_DMG, true)
        .Build()
})