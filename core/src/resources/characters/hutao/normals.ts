import { charbox, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Normals: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_N1,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_2,
                Stat: stats.stat.ATK,
                Initial: 0.4689,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N2,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_2,
                Stat: stats.stat.ATK,
                Initial: 0.4825,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N3,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_2,
                Stat: stats.stat.ATK,
                Initial: 0.6105,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N4,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_2,
                Stat: stats.stat.ATK,
                Initial: 0.6564,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N5_1,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_2,
                Stat: stats.stat.ATK,
                Initial: 0.3327,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N5_2,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_2,
                Stat: stats.stat.ATK,
                Initial: 0.352,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N6,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_2,
                Stat: stats.stat.ATK,
                Initial: 0.8596,
            },
        ],
    },
    {
        Name: strings.hits.HIT_CHARGED,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.CHARGED_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_2,
                Stat: stats.stat.ATK,
                Initial: 1.3596,
            },
        ],
    },
    {
        Name: strings.hits.HIT_PLUNGE,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.PLUNGE_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_2,
                Stat: stats.stat.ATK,
                Initial: 0.6542,
            },
        ],
    },
    {
        Name: strings.hits.HIT_PLUNGE_LOW,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.PLUNGE_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_2,
                Stat: stats.stat.ATK,
                Initial: 1.3081,
            },
        ],
    },
    {
        Name: strings.hits.HIT_PLUNGE_HIGH,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.PLUNGE_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_2,
                Stat: stats.stat.ATK,
                Initial: 1.6339,
            },
        ],
    },
]