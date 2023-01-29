import { charbox, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Bursts: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_Q + "_MELEE",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 4.64,
            },
        ],
    },
    {
        Name: strings.hits.HIT_Q + "_RANGED",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 3.784,
            },
        ],
    },
    {
        Name: "HIT_RiptideBlast",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_BURST_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.2,
            },
        ],
    },
]