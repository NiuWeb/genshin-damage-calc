import { charbox, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Normals: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_N1,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Stat: stats.stat.ATK,
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Initial: 0.376
            }
        ]
    },
    {
        Name: strings.hits.HIT_N2,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Stat: stats.stat.ATK,
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Initial: 0.36
            }
        ]
    },
    {
        Name: strings.hits.HIT_N3,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Stat: stats.stat.ATK,
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Initial: 0.448
            }
        ]
    },
    {
        Name: strings.hits.HIT_N4,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Stat: stats.stat.ATK,
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Initial: 0.5616
            }
        ]
    },
    {
        Name: strings.hits.HIT_CHARGED,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.CHARGED_ATTACK_DMG,
        Scaling: [
            {
                Stat: stats.stat.ATK,
                Scaling: scaling.TalentScaling.ELEMENTAL_1A,
                Initial: 1.4972
            }
        ]
    },
    {
        Name: strings.hits.HIT_PLUNGE,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.PLUNGE_ATTACK_DMG,
        Scaling: [
            {
                Stat: stats.stat.ATK,
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Initial: 0.5683
            }
        ]
    },
    {
        Name: strings.hits.HIT_PLUNGE_LOW,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.PLUNGE_ATTACK_DMG,
        Scaling: [
            {
                Stat: stats.stat.ATK,
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Initial: 1.1363
            }
        ]
    },
    {
        Name: strings.hits.HIT_PLUNGE_HIGH,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.PLUNGE_ATTACK_DMG,
        Scaling: [
            {
                Stat: stats.stat.ATK,
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Initial: 1.4193
            }
        ]
    },
]