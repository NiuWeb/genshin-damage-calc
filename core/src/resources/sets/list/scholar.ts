import { artifact, effect, stats } from "@src/core"

export const Scholar = artifact.Set({
    Name: "Scholar",
    Stars: 4,

    Piece2: [
        effect.Factory({
            Name: "Scholar2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ENERGY_RECHARGE)
                .Values(0.2)
                .Build()
        })
    ],
    Piece4: []
})