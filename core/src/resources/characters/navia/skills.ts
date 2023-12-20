import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E,
        Element: stats.stat.GEO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 3.948,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_DOT,
        Element: stats.stat.GEO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.36,
            },
        ],
    },
]


export const eBonus = effect.Factory({
    Name: "NaviaE",
    MaxStacks: 6,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.ALL_DMG)
        .Instance(strings.hits.HIT_E)
        .Values(0.15)
        .Map((val, _, ef) => (
            val * Math.max(0, ef.GetStacks() - 3)
        ))
        .Next()

        .Where({ effect: { conditions: ["ALL_STRIKE"] } })
        .mv
        .Multiplier(2, strings.hits.HIT_E)
        .Build()
})

export const eBonus2 = effect.Factory({
    Name: "NaviaE2",
    MaxStacks: 11,
    OnApply: new effect.Builder()
        .mv
        .Multiplier(1, strings.hits.HIT_E)
        .Map((val, _, ef) => (
            // 11 stacks = 2, 0 stakcs = 1
            val * ef.GetStacks() / 11 + 1
        ))
        .Build()
})
