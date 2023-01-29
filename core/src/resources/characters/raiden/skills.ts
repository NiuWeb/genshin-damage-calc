import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E,
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.172,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E + "_COORDINATED",
        Element: stats.stat.ELECTRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.42,
            },
        ],
    },
]

export const eBonus = effect.Factory({
    Name: "RaidenE",
    ApplyOther: true,
    OnApply: new effect.Builder()
        .observe.Owner(stats.stat.ELEMENTAL_SKILL_LEVEL, stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
        .stat
        .Char(stats.stat.ELEMENTAL_BURST_DMG)
        .Values(0.0022, 0.0023, 0.0024, 0.0025, 0.0026, 0.0027, 0.0028, 0.0029, 0.0030) // burst dmg bonus
        .Rank((_, ef) => ( // based on owner's skill level
            ef.Owner.GetCharacter().Get(stats.stat.ELEMENTAL_SKILL_LEVEL)
        ))
        .Map((bonus, target) => (
            bonus * target.GetCharacter().Options.BurstCost
        ))
        .Build()
})