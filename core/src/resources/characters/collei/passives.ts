import { effect, scaling, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "ColleiA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .instance
        .Location("Skill")
        .Options({
            Name: "HIT_A1",
            Element: stats.stat.DENDRO_DMG,
            Talent: stats.stat.ELEMENTAL_SKILL_DMG,
            Scaling: [
                {
                    Stat: stats.stat.ATK,
                    Scaling: scaling.TalentScaling.NONE,
                    Talent: stats.stat.NONE,
                    Initial: 0.4
                }
            ]
        })
        .Build()
})