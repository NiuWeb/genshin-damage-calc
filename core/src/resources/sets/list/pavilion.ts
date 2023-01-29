import { artifact, effect, stats } from "@src/core"

export const DesertPavilionChronicle = artifact.Set({
    Name: "DesertPavilionChronicle",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "DesertPavilionChronicle2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ANEMO_DMG)
                .Values(0.15)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "DesertPavilionChronicle4",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG, stats.stat.PLUNGE_ATTACK_DMG)
                .Values(0.4)
                .Build()
        })
    ]
})