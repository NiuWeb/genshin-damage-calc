import { charbox, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.0334,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_1 + "_1",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.0455,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_1 + "_2",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.0326,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_2 + "_1",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.0514,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_2 + "_2",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.0396,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_3 + "_1",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.0717,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_3 + "_2",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.0506,
            },
        ],
    },
]