import { artifact, effect, stats } from "@src/core"

export const Gambler = artifact.Set({
    Name: "Gambler",
    Stars: 4,

    Piece2: [
        effect.Factory({
            Name: "Gambler2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG)
                .Values(0.2)
                .Build()
        })
    ],

    Piece4: []
})