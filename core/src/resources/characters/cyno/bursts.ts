import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_N1 + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.7828,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N2 + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.8247,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N3 + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.0463,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N4 + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.5169,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N5 + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.3084,
            },
        ],
    },
    {
        Name: strings.hits.HIT_CHARGED + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.CHARGED_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.0105,
            },
        ],
    },
    {
        Name: strings.hits.HIT_PLUNGE + "_Q",
        Element: stats.stat.ELECTRO_DMG,
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
        Name: strings.hits.HIT_PLUNGE_LOW + "_Q",
        Element: stats.stat.ELECTRO_DMG,
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
        Name: strings.hits.HIT_PLUNGE_HIGH + "_Q",
        Element: stats.stat.ELECTRO_DMG,
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

export const qBonus = effect.Factory({
    Name: "CynoQ",
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ELEMENTAL_MASTERY)
        .Values(100)
        .Build()
})