import { artifact, effect, stats } from "@src/core"

export const VermillionHereafter = artifact.Set({
    Name: "VermillionHereafter",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "VermillionHereafter2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.18)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "VermillionHereafter4",
            MaxStacks: 4,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.08)
                .Next()

                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.1)
                .Stacks()
                .Build()
        })
    ]
})
