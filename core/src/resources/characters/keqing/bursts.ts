import { charbox, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_Q,
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.88,
            },
        ],
    },
    {
        Name: strings.hits.HIT_Q_DOT,
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.24,
            },
        ],
    },
    {
        Name: strings.hits.HIT_Q_EXPLOSION,
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.888,
            },
        ],
    },
]