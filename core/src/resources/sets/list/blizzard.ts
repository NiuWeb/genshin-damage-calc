import { artifact, effect, stats } from "@src/core"

export const BlizzardStrayer = artifact.Set({
    Name: "BlizzardStrayer",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "BlizzardStrayer2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.CRYO_DMG)
                .Values(0.15)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "BlizzardStrayer4",
            OnApply: new effect.Builder()
                .Where({ enemy: { affected: [stats.stat.CRYO_DMG] } })
                .stat
                .Char(stats.stat.EXTRA_CRIT_RATE)
                .Values(0.2)
                .Next()

                .Where({ enemy: { aura: [stats.aura.FROZEN] } })
                .stat
                .Char(stats.stat.EXTRA_CRIT_RATE)
                .Values(0.2)
                .Next()
                .Build()
        })
    ]
})