import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E,
        Element: stats.stat.ANEMO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.952,
            },
        ],
    },
]

export const eBonus = effect.Factory({
    Name: "WandererE",
    OnApply: new effect.Builder()
        .observe.Target(stats.stat.ELEMENTAL_SKILL_LEVEL, stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
        .mv
        .Multiplier(0.3298, /hit_n\d/i)
        .Map((v, tg) => (
            1 + v * scaling.TalentScaling.ELEMENTAL_2[
            tg.GetCharacter().Get(stats.stat.ELEMENTAL_SKILL_LEVEL) - 1
            ]
        ))
        .Next()

        .observe.Target(stats.stat.ELEMENTAL_SKILL_LEVEL, stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
        .mv
        .Multiplier(0.2639, /hit_charged/i)
        .Map((v, tg) => (
            1 + v * scaling.TalentScaling.ELEMENTAL_2[
            tg.GetCharacter().Get(stats.stat.ELEMENTAL_SKILL_LEVEL) - 1
            ]
        ))
        .Build()
})