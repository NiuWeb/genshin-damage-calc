import { artifact, effect, stats } from "@src/core"

export const MartialArtist = artifact.Set({
    Name: "MartialArtist",
    Stars: 4,

    Piece2: [
        effect.Factory({
            Name: "MartialArtist2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.15)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "MartialArtist4",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.25)
                .Build()
        })
    ]
})