import { artifact, effect, stats } from "@src/core"

export const BraveHeart = artifact.Set({
    Name: "BraveHeart",
    Stars: 4,

    Piece2: [
        effect.Factory({
            Name: "BraveHeart2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.18)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "BraveHeart4",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.3)
                .Build()
        })
    ]
})