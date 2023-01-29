import { artifact, effect, stats } from "@src/core"

export const DefendersWill = artifact.Set({
    Name: "DefendersWill",
    Stars: 4,

    Piece2: [
        effect.Factory({
            Name: "DefendersWill2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.DEF_PERCENT)
                .Values(0.3)
                .Build()
        })
    ],

    Piece4: []
})