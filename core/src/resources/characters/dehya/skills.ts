import { charbox, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E_1,
        Element: stats.stat.PYRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.1288,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_2,
        Element: stats.stat.PYRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.328,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E_DOT,
        Element: stats.stat.PYRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.602,
            },
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.HP,
                Initial: 0.0103,
            },
        ],
    },
]