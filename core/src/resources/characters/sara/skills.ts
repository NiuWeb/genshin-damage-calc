import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E,
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.2576,
            },
        ],
    },
]

export const eBonus = effect.Factory({
    Name: "SaraE",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Owner(stats.stat.ATK_BASE, stats.stat.ELEMENTAL_SKILL_LEVEL, stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
        .stat
        .Char(stats.stat.ATK_FLAT)
        .Values(...scaling.TalentScaling.ELEMENTAL_1)
        .Rank((_, effect) => (
            effect.Owner.GetCharacter().Get(stats.stat.ELEMENTAL_SKILL_LEVEL)
        ))
        .Map((value, _, effect) => (
            0.4296 * value * effect.Owner.GetCharacter().Get(stats.stat.ATK_BASE)
        ))
        .Build()
})