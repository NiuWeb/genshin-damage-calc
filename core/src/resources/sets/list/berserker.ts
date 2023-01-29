import { artifact, effect, stats } from "@src/core"

export const Berserker = artifact.Set({
    Name: "Berserker",
    Stars: 4,

    Piece2: [
        effect.Factory({
            Name: "Berserker2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.CRIT_RATE)
                .Values(0.12)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "Berserker4",
            OnApply: new effect.Builder()
                .Where({ target: { hp: { leq: 0.7 } } })
                .stat
                .Char(stats.stat.CRIT_RATE)
                .Values(0.24)
                .Build()
        })
    ]
})