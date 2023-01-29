import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E_PRESS,
        Element: stats.stat.ANEMO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.92,

            }
        ],
    },
    {
        Name: strings.hits.HIT_E_HOLD,
        Element: stats.stat.ANEMO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 2.608,

            }
        ],
    },
]

export const ePlunge = effect.Factory({
    Name: "KazuhaE",
    OnApply: new effect.Builder()
        .instance
        .Location("Normal")
        .Options({
            Name: strings.hits.HIT_PLUNGE + "_E",
            Element: stats.stat.ANEMO_DMG,
            Talent: stats.stat.PLUNGE_ATTACK_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.PHYSICAL_1,
                    Stat: stats.stat.ATK,
                    Initial: 0.8183,
                    Talent: stats.stat.NORMAL_ATTACK_LEVEL
                },
            ],
        })
        .Next()

        .instance
        .Location("Normal")
        .Options({
            Name: strings.hits.HIT_PLUNGE_LOW + "_E",
            Element: stats.stat.ANEMO_DMG,
            Talent: stats.stat.PLUNGE_ATTACK_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.PHYSICAL_1,
                    Stat: stats.stat.ATK,
                    Initial: 1.6363,
                    Talent: stats.stat.NORMAL_ATTACK_LEVEL
                },
            ],
        })
        .Next()

        .instance
        .Location("Normal")
        .Options({
            Name: strings.hits.HIT_PLUNGE_HIGH + "_E",
            Element: stats.stat.ANEMO_DMG,
            Talent: stats.stat.PLUNGE_ATTACK_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.PHYSICAL_1,
                    Stat: stats.stat.ATK,
                    Initial: 2.0439,
                    Talent: stats.stat.NORMAL_ATTACK_LEVEL
                },
            ],
        },)
        .Build()
})