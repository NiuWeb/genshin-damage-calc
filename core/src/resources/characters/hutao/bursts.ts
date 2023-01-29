import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_Q,
        Element: stats.stat.PYRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_2,
                Stat: stats.stat.ATK,
                Initial: 3.0327,
            },
        ],
    },
]

export const qBonus = effect.Factory({
    Name: "HuTaoQ",
    OnApply: new effect.Builder().
        mv.
        Where({ target: { hp: { leq: 0.5 } } }).
        Multiplier(3.7909 / 3.0327, "HIT_Q").
        Build(),
})