import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"
import { a4bonus } from "./passives"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_Q,
        Element: stats.stat.GEO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 2.44,
            },
        ],
    },
]

export const qBonus = effect.Factory({
    Name: "YunjinQ",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Party(true)
        .observe.Owner(
            stats.stat.DEF_PERCENT,
            stats.stat.DEF_BASE,
            stats.stat.DEF_FLAT,
            stats.stat.ELEMENTAL_BURST_LEVEL,
            stats.stat.ELEMENTAL_BURST_LEVEL_UP,
        )
        .stat
        .Char(stats.stat.NORMAL_ATTACK_DMG_FLAT)
        .Values(...scaling.TalentScaling.ELEMENTAL_1)
        .Rank((_, ef) => (
            ef.Owner.GetCharacter().Get(stats.stat.ELEMENTAL_BURST_LEVEL)
        ))
        .Map((v, _, ef) => (
            (0.3216 * v + a4bonus(ef.Owner)) * ef.Owner.GetCharacter().Get(stats.stat.DEF)
        ))
        .Build()
})
