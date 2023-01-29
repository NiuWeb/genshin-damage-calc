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
                Stat: stats.stat.ATK,
                Initial: 0.6646,
            },
        ],
    },
]

export const qBonus = effect.Factory({
    Name: "AyatoQ",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Owner(stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .stat
        .Char(stats.stat.NORMAL_ATTACK_DMG)
        .Values(0.11, 0.12, 0.13, 0.14, 0.15, 0.16, 0.17, 0.18, 0.19, 0.2)
        .Rank((_, ef) => (
            ef.Owner.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL)
        ))
        .Build()
})