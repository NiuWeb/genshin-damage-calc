import { charbox, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.72,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N1 + "_E",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.3887,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N2 + "_E",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.4162,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N3 + "_E",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.5633,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N4 + "_E",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.5994,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N5 + "_E",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.553,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N6_1 + "_E",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.3543,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N6_2 + "_E",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.3767,
            },
        ],
    },
    {
        Name: strings.hits.HIT_CHARGED_1 + "_E",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.CHARGED_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.602,
            },
        ],
    },
    {
        Name: strings.hits.HIT_CHARGED_2 + "_E",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.CHARGED_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.7198,
            },
        ],
    },
    {
        Name: "HIT_RiptideSlash",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.602,
            },
        ],
    },
]