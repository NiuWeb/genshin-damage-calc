import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E_PRESS,
        Element: stats.stat.GEO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.16,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E + "_RESONANCE",
        Element: stats.stat.GEO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.32,
            }
        ],
    },
    {
        Name: strings.hits.HIT_E_HOLD,
        Element: stats.stat.GEO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.8,
            },
        ],
    },
]

export const eRes = effect.Factory({
    Name: "ZhongliE",
    ApplySelf: true,
    ApplyOther: true,
    OnApply: (target, _, register) => {
        const elements = stats.Elements
        for (const el of elements) {
            const res = stats.DmgToRes(el)
            register.Modifier(target.GetCharacter().GetEnemy().Subject.CreateModifier(res, -0.2))
        }

        return () => 0
    },
})
