import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E,
        Element: stats.stat.CRYO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.7204,
            },
        ],
    }
]

export const eBonus = effect.Factory({
    Name: "ChongyunE",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .infusion
        .Set(stats.stat.CRYO_DMG, false)
        .Build()
})