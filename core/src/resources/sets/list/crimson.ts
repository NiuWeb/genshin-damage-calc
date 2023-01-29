import { artifact, effect, stats } from "@src/core"

export const CrimsonWitchOfFlames = artifact.Set({
    Name: "CrimsonWitchOfFlames",
    Stars: 5,
    Piece2: [
        effect.Factory({
            Name: "CrimsonWitchOfFlames2",
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.PYRO_DMG).
                Values(0.15).
                Build()
        })
    ],
    Piece4: [
        effect.Factory({
            Name: "CrimsonWitchOfFlames4",
            MaxStacks: 3,
            OnApply: new effect.Builder().
                stat.
                // Vape/melt bonus
                Char(stats.stat.VAPORIZE_DMG, stats.stat.MELT_DMG).
                Values(0.15).
                Next().

                // Transformative bonus
                stat.
                Char(stats.stat.OVERLOAD_DMG, stats.stat.BURGEON_DMG, stats.stat.BURNING_DMG).
                Values(0.4).
                Next().

                // stackable Pyro bonus
                stat.
                Char(stats.stat.PYRO_DMG).
                Values(0.075).
                Stacks().
                Build(),
        })
    ]
})