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
                Initial: 1.216,
            },
        ],
    }
]

export const eBonus = effect.Factory({
    Name: "BeidouE",
    MaxStacks: 2,
    OnApply: new effect.Builder()
        .observe.Target(stats.stat.ELEMENTAL_SKILL_LEVEL, stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
        .mv
        .Mv(stats.stat.ATK, 0.96, strings.hits.HIT_E)
        .Map((init, target, ef) => {
            const stacks = ef.GetStacks()
            const index = target.GetCharacter().Get(stats.stat.ELEMENTAL_SKILL_LEVEL) - 1
            const value = scaling.TalentScaling.ELEMENTAL_1[index]
            return init * value * stacks
        })
        .Build()
})