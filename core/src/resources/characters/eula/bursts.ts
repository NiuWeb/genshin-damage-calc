import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_Q,
        Element: stats.stat.CRYO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 2.456,
            },
        ],
    },
    {
        Name: "HIT_LightfallSword",
        Element: stats.stat.PHYSICAL_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1A,
                Stat: stats.stat.ATK,
                Initial: 3.6705,
            },
        ],
    },
]

export const qBonus = effect.Factory({
    Name: "EulaQ",
    MaxStacks: 30,
    OnApply: new effect.Builder()
        .observe.Target(stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .mv
        .Mv(stats.stat.ATK, 0.7499, "HIT_LightfallSword")
        .Map((v, tg, ef) => {
            const level = Math.max(1, Math.min(15, tg.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL)))
            const stacks = ef.GetStacks()
            return stacks * v * scaling.TalentScaling.PHYSICAL_1A[level - 1]
        })
        .Build()
})