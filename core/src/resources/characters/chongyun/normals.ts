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
                Initial: 0.7,
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
                Initial: 0.6312,
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
                Initial: 0.8032,
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
                Initial: 1.0122,
            },
        ],
    },
    {
        Name: strings.hits.HIT_CHARGED_SPIN,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.CHARGED_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.5629,
            },
        ],
    },
    {
        Name: strings.hits.HIT_CHARGED_FINAL,
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.CHARGED_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.0178,
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
                Initial: 0.7459,
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
                Initial: 1.4914,
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
                Initial: 1.8629,
            },
        ],
    },
]