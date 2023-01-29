import { artifact, effect, stats } from "@src/core"

export const MaidenBeloved = artifact.Set({
    Name: "MaidenBeloved",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "MaidenBeloved2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.HEALING_BONUS)
                .Values(0.15)
                .Build()
        })
    ],

    Piece4: []
})