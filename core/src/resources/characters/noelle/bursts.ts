import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_Q_1,
        Element: stats.stat.GEO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.672,
            },
        ],
    },
    {
        Name: strings.hits.HIT_Q_2,
        Element: stats.stat.GEO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.928,
            },
        ],
    },
]

export const qBonus = effect.Factory({
    Name: "NoelleQ",
    OnApply: new effect.Builder()
        .infusion
        .Set(stats.stat.GEO_DMG, true)
        .Next()

        .observe.Target(
            stats.stat.DEF_FLAT, stats.stat.DEF_PERCENT, stats.stat.DEF_FLAT,
            stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP
        )
        .stat
        .Char(stats.stat.ATK_FLAT)
        .Values(0.4, 0.43, 0.46, 0.5, 0.53, 0.56, 0.6, 0.64, 0.68, 0.72, 0.76, 0.8, 0.85, 0.9, 0.95)
        .Rank(tg => (
            tg.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL)
        ))
        .Map((v, tg) => (
            v * tg.GetCharacter().Get(stats.stat.DEF)
        ))
        .Build()
})