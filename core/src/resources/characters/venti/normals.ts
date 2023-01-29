import { charbox, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Normals: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_N1,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1A,
                Stat: stats.stat.ATK,
                Initial: 0.2038,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N2,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1A,
                Stat: stats.stat.ATK,
                Initial: 0.4438,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N3,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1A,
                Stat: stats.stat.ATK,
                Initial: 0.5237,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N4,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1A,
                Stat: stats.stat.ATK,
                Initial: 0.2606,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N5,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1A,
                Stat: stats.stat.ATK,
                Initial: 0.5065,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N6,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1A,
                Stat: stats.stat.ATK,
                Initial: 0.7095,
            },
        ],
    },
    {
        Name: strings.hits.HIT_AIMED_NORMAL,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.AIMED_SHOT_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1A,
                Stat: stats.stat.ATK,
                Initial: 0.4386,
            },
        ],
    },
    {
        Name: strings.hits.HIT_AIMED_CHARGED,
        Element: stats.stat.ANEMO_DMG,
        Talent: stats.stat.CHARGED_AIMED_SHOT_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1A,
                Stat: stats.stat.ATK,
                Initial: 1.24,
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
                Initial: 0.5683,
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
                Initial: 1.1363,
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
                Initial: 1.4193,
            },
        ],
    },
]