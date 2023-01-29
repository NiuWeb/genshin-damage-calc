import { effect, scaling, stats } from "@src/core"

export const a1 = effect.Factory({
    Name: "EulaA1",
    OnApply: new effect.Builder()
        .Where({ target: { ascension: 1 } })
        .instance
        .Location("Burst")
        .Options({
            Name: "HIT_A1",
            Talent: stats.stat.ELEMENTAL_BURST_DMG,
            Element: stats.stat.PHYSICAL_DMG,
            Scaling: [
                {
                    Scaling: scaling.TalentScaling.PHYSICAL_1A,
                    Talent: stats.stat.ELEMENTAL_BURST_LEVEL,
                    Stat: stats.stat.ATK,
                    Initial: 3.6705 * 0.5,
                },
            ],
        })
        .Build()
})