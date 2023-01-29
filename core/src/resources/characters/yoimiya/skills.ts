import { effect, stats, scaling } from "@src/core"

export const eBonus = effect.Factory({
    Name: "YoimiyaE",
    OnApply: new effect.Builder()
        .infusion
        .Set(stats.stat.PYRO_DMG, true)
        .Next()

        .observe.Target(stats.stat.ELEMENTAL_SKILL_LEVEL, stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
        .mv
        .Multiplier(0.3791, /hit_n\d/i)
        .Map((v, tg) => (
            1 + v * scaling.TalentScaling.ELEMENTAL_2[
            tg.GetCharacter().Get(stats.stat.ELEMENTAL_SKILL_LEVEL) - 1
            ]
        ))
        .Build()
})