import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E_PRESS,
        Element: stats.stat.CRYO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.464,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_HOLD,
        Element: stats.stat.CRYO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 2.456,
            },
        ],
    },
    {
        Name: "HIT_Icewhirl",
        Element: stats.stat.CRYO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.96,
            },
        ],
    },
]

export const eBonus1 = effect.Factory({
    Name: "EulaE_1",
    MaxStacks: 2,
    OnApply: new effect.Builder()
        .stat
        .Char(stats.stat.DEF_PERCENT)
        .Values(0.3)
        .Stacks()
        .Build()
})
export const eBonus2 = effect.Factory({
    Name: "EulaE_2",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Owner(stats.stat.ELEMENTAL_SKILL_LEVEL, stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
        .stat
        .Enemy(stats.stat.CRYO_RES, stats.stat.PHYSICAL_RES)
        .Values(-0.16, -0.17, -0.18, -0.19, -0.20, -0.21, -0.22, -0.23, -0.24, -0.25)
        .Rank((_, ef) => (
            ef.Owner.GetCharacter().Get(stats.stat.ELEMENTAL_SKILL_LEVEL)
        ))
        .Build()
})