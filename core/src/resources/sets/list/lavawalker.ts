import { artifact, effect, stats } from "@src/core"

export const Lavawalker = artifact.Set({
    Name: "Lavawalker",
    Stars: 5,

    Piece2: [],

    Piece4: [
        effect.Factory({
            Name: "Lavawalker4",
            OnApply: new effect.Builder()
                .Where({ enemy: { affected: [stats.stat.PYRO_DMG] } })
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.35)

                .Build()
        })
    ]
})