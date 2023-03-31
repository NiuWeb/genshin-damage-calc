import { artifact, effect, stats } from "@src/core"

export const NymphsDream = artifact.Set({
    Name: "NymphsDream",
    Stars: 5,
    Piece2: [
        effect.Factory({
            Name: "NymphsDream2",
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.HYDRO_DMG).
                Values(0.15)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "NymphsDream4",
            MaxStacks: 3,
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.ATK_PERCENT)
                .Stacks([0, 0.07, 0.16, 0.25])
                .Next()

                .stat
                .Char(stats.stat.HYDRO_DMG)
                .Stacks([0, 0.04, 0.09, 0.15])
                .Build()
        })
    ]
})
