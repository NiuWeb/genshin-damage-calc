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
                Initial: 1.392,
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
                Initial: 1.888,
            },
        ],
    },
]

export const eBonus = effect.Factory({
    Name: "ShenheE",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Owner(
            stats.stat.ELEMENTAL_SKILL_LEVEL,
            stats.stat.ELEMENTAL_SKILL_LEVEL_UP,
            stats.stat.ATK_PERCENT,
            stats.stat.ATK_BASE,
            stats.stat.ATK_FLAT,
        )
        .stat
        .Char(stats.stat.CRYO_DMG_FLAT)
        .Values(...scaling.TalentScaling.ELEMENTAL_1)
        .Rank((_, ef) => (
            ef.Owner.GetCharacter().Get(stats.stat.ELEMENTAL_SKILL_LEVEL)
        ))
        .Map((v, _, ef) => (
            0.4566 * v * ef.Owner.GetCharacter().Get(stats.stat.ATK)
        ))
        .Build()
})