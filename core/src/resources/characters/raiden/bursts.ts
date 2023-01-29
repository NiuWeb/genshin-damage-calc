import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_Q,
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 4.008,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N1 + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.4447,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N2 + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.4396,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N3 + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.5382,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N4 + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.3089,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N5 + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.7394,
            },
        ],
    },
    {
        Name: strings.hits.HIT_CHARGED_1 + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.616,
            },
        ],
    },
    {
        Name: strings.hits.HIT_CHARGED_2 + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.7436,
            },
        ],
    },
    {
        Name: strings.hits.HIT_PLUNGE + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.6393,
            },
        ],
    },
    {
        Name: strings.hits.HIT_PLUNGE_LOW + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.2784,
            },
        ],
    },
    {
        Name: strings.hits.HIT_PLUNGE_HIGH + "_Q",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.5968,
            },
        ],
    },
]


export const qBonus = effect.Factory({
    Name: "RaidenQ",
    MaxStacks: 60,
    OnApply: new effect.Builder()
        .observe.Target(stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .mv
        .Mv(stats.stat.ATK, 0.0389, strings.hits.HIT_Q)
        .Map((x, target, effect) => (
            effect.GetStacks() * x * scaling.TalentScaling.ELEMENTAL_1[
            Math.max(0, Math.min(scaling.TalentScaling.ELEMENTAL_1.length - 1,
                target.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL) - 1
            ))
            ]
        ))
        .Next()
        
        .observe.Target(stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .mv
        .Mv(stats.stat.ATK, 0.0073, /_.+_Q$/)
        .Map((x, target, effect) => (
            effect.GetStacks() * x * scaling.TalentScaling.ELEMENTAL_1[
            Math.max(0, Math.min(scaling.TalentScaling.ELEMENTAL_1.length - 1,
                target.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL) - 1
            ))
            ]
        ))

        .Build()
})