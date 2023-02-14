import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_Q,
        Element: stats.stat.ANEMO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 3.776,
            },
        ],
    },
]

export const qBonus = effect.Factory({
    Name: "FaruzanQ",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .stat
        .Enemy(stats.stat.ANEMO_RES)
        .Values(-0.3)
        .Next()

        .observe.Owner(stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .stat
        .Char(stats.stat.ANEMO_DMG)
        .Values(...scaling.TalentScaling.ELEMENTAL_1)
        .Rank((_, ef) => ef.Owner.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL))
        .Map((v) => v * 0.18)
        .Build()
})