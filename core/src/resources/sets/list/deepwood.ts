import { artifact, effect, stats } from "@src/core"

export const DeepwoodMemories = artifact.Set({
    Name: "DeepwoodMemories",
    Stars: 5,
    Piece2: [
        effect.Factory({
            Name: "DeepwoodMemories2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.DENDRO_DMG)
                .Values(0.15)
                .Build()
        })
    ],
    Piece4: [
        effect.Factory({
            Name: "DeepwoodMemories4",
            ApplyOther: true,
            OnApply: new effect.Builder()
                .stat
                .Enemy(stats.stat.DENDRO_RES)
                .Values(-0.3)
                .Build()
        })
    ]
})