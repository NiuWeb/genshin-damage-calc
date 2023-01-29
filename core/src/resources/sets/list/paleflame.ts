import { artifact, effect, stats } from "@src/core"

export const PaleFlame = artifact.Set({
    Name: "PaleFlame",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "PaleFlame2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.PHYSICAL_DMG)
                .Values(0.25)
                .Build()
        })
    ],
    Piece4: [
        effect.Factory({
            Name: "PaleFlame4",
            MaxStacks: 2,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.09)
                .Stacks()
                .Next()

                .stat
                .Char(stats.stat.PHYSICAL_DMG)
                .Stacks([0, 0, 0.25])
                .Build()
        })
    ]
})