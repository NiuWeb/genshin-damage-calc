import { charbox, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Normals: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_N1,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.5246,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N2,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.516,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N3,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.3182,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N4,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.6966,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N5_1,
        Element: stats.stat.PHYSICAL_DMG,
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
        Name: strings.hits.HIT_N5_2,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.43,
            },
        ],
    },
    {
        Name: strings.hits.HIT_CHARGED,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.CHARGED_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.3674,
            },
        ],
    },
    {
        Name: strings.hits.HIT_PLUNGE,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.PLUNGE_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.6393,
            },
        ],
    },
    {
        Name: strings.hits.HIT_PLUNGE_LOW,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.PLUNGE_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.2784,
            },
        ],
    },
    {
        Name: strings.hits.HIT_PLUNGE_HIGH,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.PLUNGE_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.5968,
            },
        ],
    },
]