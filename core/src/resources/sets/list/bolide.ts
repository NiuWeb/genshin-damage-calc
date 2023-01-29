import { artifact, effect, stats } from "@src/core"

export const RetracingBolide = artifact.Set({
    Name: "RetracingBolide",
    Stars: 5,

    Piece2: [],
    Piece4: [
        effect.Factory({
            Name: "RetracingBolide4",
            OnApply: new effect.Builder()
                .Where({ target: { shielded: true } })
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.4)
                .Build()
        })
    ]
})