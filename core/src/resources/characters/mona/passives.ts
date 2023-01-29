import { effect, scaling, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "MonaA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .instance
        .Location("Skill")
        .Options({
            Name: "HIT_A1",
            Element: stats.stat.HYDRO_DMG,
            Talent: stats.stat.ELEMENTAL_SKILL_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.ELEMENTAL_1,
                    Talent: stats.stat.ELEMENTAL_SKILL_LEVEL,
                    Stat: stats.stat.ATK,
                    Initial: 1.328 * 0.5,
                },
            ],
        })
        .Build()
})

export const a4 = effect.Factory({
    Name: "MonaA4",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 4 } })
        .observe.Target(stats.stat.ENERGY_RECHARGE)
        .stat
        .Char(stats.stat.HYDRO_DMG)
        .Values(0.2)
        .Map((v, tg) => (
            v * tg.GetCharacter().Get(stats.stat.ENERGY_RECHARGE)
        ))
        .Build()
})