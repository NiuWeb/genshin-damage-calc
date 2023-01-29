import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_E,
        Element: stats.stat.PYRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.ELEMENTAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.64,
            },
        ],
    },
]

export const eBonus = effect.Factory({
    Name: "HuTaoE",
    ApplySelf: true,
    OnApply: new effect.Builder().
        // Update on talent or HP changes
        observe.Target(
            stats.stat.ELEMENTAL_SKILL_LEVEL, stats.stat.ELEMENTAL_SKILL_LEVEL_UP,
            stats.stat.ATK_BASE, stats.stat.HP_BASE, stats.stat.HP_FLAT, stats.stat.HP_PERCENT).
        stat.
        Char(stats.stat.ATK_FLAT).
        // Use ELEMENTAL_2 scaling as values
        Values(...scaling.TalentScaling.ELEMENTAL_2).
        // Use talent level as rank index
        Rank(target => (
            target.GetCharacter().Get(stats.stat.ELEMENTAL_SKILL_LEVEL)
        )).
        // Convert scaling values to ATK Flat bonus
        Map((x, target) => {
            const char = target.GetCharacter()
            const value = 0.0384 * x * char.Get(stats.stat.HP)
            const max = char.Get(stats.stat.ATK_BASE) * 4
            return Math.max(0, Math.min(max, value))
        }).
        Next().

        infusion.
        Set(stats.stat.PYRO_DMG, true).
        Build(),
})
