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
                Initial: 2.328,
            },
        ],
    },
]

export const qBonus = effect.Factory({
    Name: "BennettQ",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Owner(stats.stat.ATK_BASE, stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP)
        .stat
        .Char(stats.stat.ATK_FLAT)
        .Values(...scaling.TalentScaling.ELEMENTAL_1)
        .Rank((_, effect) => (
            effect.Owner.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL)
        ))
        .Map((value, _, effect) => {
            const c1 = effect.Owner.FindEffect("BennettC1")
            const bonus = 0.56 * value + (c1 && c1.Enabled() ? 0.2 : 0)
            return bonus * effect.Owner.GetCharacter().Get(stats.stat.ATK_BASE)
        })
        .Build()
})