import { artifact, effect, stats } from "@src/core"

export const ShimenawasReminiscence = artifact.Set({
    Name: "ShimenawasReminiscence",
    Stars: 5,
    Piece2: [
        effect.Factory({
            Name: "ShimenawasReminiscence2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.18)
                .Build()
        })
    ],
    Piece4: [
        effect.Factory({
            Name: "ShimenawasReminiscence4",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG, stats.stat.PLUNGE_ATTACK_DMG)
                .Values(0.5)
                .Build()
        })
    ]
})