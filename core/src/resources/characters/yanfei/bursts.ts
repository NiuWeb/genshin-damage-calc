import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_Q,
        Element: stats.stat.PYRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.824,
            },
        ],
    },
]

export const qBonus = effect.Factory({
    Name: "YanfeiQ",
    OnApply: new effect.Builder()
        .observe.Target(stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .stat
        .Char(stats.stat.CHARGED_ATTACK_DMG)
        .Values(...scaling.TalentScaling.ELEMENTAL_2)
        .Rank((tg) => (
            tg.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL)
        ))
        .Map((v) => 0.334 * v)
        .Build()
})