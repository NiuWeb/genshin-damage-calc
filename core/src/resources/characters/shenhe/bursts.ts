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
                Initial: 1.008,
            },
        ],
    },
    {
        Name: strings.hits.HIT_Q_DOT,
        Element: stats.stat.CRYO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.3312,
            },
        ],
    },
]

export const qBonus = effect.Factory({
    Name: "ShenheQ",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Owner(
            stats.stat.ELEMENTAL_BURST_LEVEL,
            stats.stat.ELEMENTAL_BURST_LEVEL_UP,
        )
        .stat
        .Enemy(stats.stat.CRYO_RES, stats.stat.PHYSICAL_RES)
        .Values(-0.06, -0.07, -0.08, -0.09, -0.10, -0.11, -0.12, -0.13, -0.14, -0.15)
        .Rank((_, ef) => (
            ef.Owner.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL)
        ))
        .Build()
})