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
                Initial: 0.3173,
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
                Initial: 0.356,
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
                Initial: 0.4549,
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
                Initial: 0.4549,
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
                Initial: 0.4825,
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
                Initial: 0.5762,
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
        Element: stats.stat.CRYO_DMG,
        Talent: stats.stat.CHARGED_AIMED_SHOT_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.24,
            },
        ],
    },
    {
        Name: "HIT_Frostflake",
        Element: stats.stat.CRYO_DMG,
        Talent: stats.stat.CHARGED_AIMED_SHOT_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.28,
            },
        ],
    },
    {
        Name: "HIT_FrostflakeBloom",
        Element: stats.stat.CRYO_DMG,
        Talent: stats.stat.CHARGED_AIMED_SHOT_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 2.176,
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