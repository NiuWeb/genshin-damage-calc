import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"
import { countGeos } from "./count-geos"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E,
        Element: stats.stat.GEO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.072,
            },
        ],
    },
]

export const eBonus = effect.Factory({
    Name: "GorouE",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Owner(stats.stat.ELEMENTAL_SKILL_LEVEL, stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
        .observe.Party(true)
        .stat
        .Char(stats.stat.DEF_FLAT)
        .Values(...scaling.TalentScaling.ELEMENTAL_1)
        .Rank((_, ef) => (
            ef.Owner.GetCharacter().Get(stats.stat.ELEMENTAL_SKILL_LEVEL)
        ))
        .Map((v, tg) => (
            206.16 * v * (countGeos(tg) >= 1 ? 1 : 0)
        ))
        .Next()

        .observe.Party(true)
        .stat
        .Char(stats.stat.GEO_DMG)
        .Values(0.15)
        .Map((v, tg) => (
            v * (countGeos(tg) >= 3 ? 1 : 0)
        ))
        .Build()
})