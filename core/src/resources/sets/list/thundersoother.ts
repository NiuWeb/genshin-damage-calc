import { artifact, effect, stats } from "@src/core"

export const Thundersoother = artifact.Set({
    Name: "Thundersoother",
    Stars: 5,

    Piece2: [],

    Piece4: [
        effect.Factory({
            Name: "Thundersoother4",
            OnApply: new effect.Builder()
                .Where({ enemy: { affected: [stats.stat.ELECTRO_DMG] } })
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.35)
                .Build()
        })
    ]
})