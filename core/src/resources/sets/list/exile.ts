import { artifact, effect, stats } from "@src/core"

export const TheExile = artifact.Set({
    Name: "TheExile",
    Stars: 4,

    Piece2: [
        effect.Factory({
            Name: "TheExile2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ENERGY_RECHARGE)
                .Values(0.2)
                .Build()
        })
    ],
    Piece4: []
})