import { charbox, effect, scaling, stats } from "@src/core"
import { strings } from "@src/strings"

export const Skills: charbox.PartialInstanceOptions[] = [
    {
        Name: strings.hits.HIT_N1 + "_E",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.5289,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N2 + "_E",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.5891,
            },
        ],
    },
    {
        Name: strings.hits.HIT_N3 + "_E",
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.NORMAL_ATTACK_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 0.6493,
            },
        ],
    },
    {
        Name: strings.hits.HIT_E,
        Element: stats.stat.HYDRO_DMG,
        Talent: stats.stat.ELEMENTAL_SKILL_DMG,
        Scaling: [
            {
                Scaling: scaling.TalentScaling.PHYSICAL_1,
                Stat: stats.stat.ATK,
                Initial: 1.0148,
            },
        ],
    }
]

export const eBonus = effect.Factory({
    Name: "AyatoE",
    MaxStacks: 5,
    OnApply: new effect.Builder()
        .observe.Target(stats.stat.ELEMENTAL_SKILL_LEVEL, stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
        .mv
        .Mv(stats.stat.HP, 0.56 / 100, /HIT_N\d_E/i)
        .Map((v, tg, ef) => (
            v * ef.GetStacks() * scaling.TalentScaling.PHYSICAL_1[
            tg.GetCharacter().Get(stats.stat.ELEMENTAL_SKILL_LEVEL) - 1
            ]
        ))

        .Build()
})