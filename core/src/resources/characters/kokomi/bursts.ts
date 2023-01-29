import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_Q,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.1042,
            },
        ],
    },
]

export const qBonus = effect.Factory({
    Name: "KokomiQ",
    OnApply: new effect.Builder()
        .observe.Target(stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .mv
        .Mv(stats.stat.HP, 0.0484, /HIT_N\d/i)
        .Map((v, tg) => (
            v * scaling.TalentScaling.ELEMENTAL_1[
            tg.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL) - 1
            ]
        ))
        .Next()

        .observe.Target(stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .mv
        .Mv(stats.stat.HP, 0.0678, /charged/i)
        .Map((v, tg) => (
            v * scaling.TalentScaling.ELEMENTAL_1[
            tg.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL) - 1
            ]
        ))
        .Next()

        .observe.Target(stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .mv
        .Mv(stats.stat.HP, 0.071, /HIT_E$/i)
        .Map((v, tg) => (
            v * scaling.TalentScaling.ELEMENTAL_1[
            tg.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL) - 1
            ]
        ))
        .Build()
})