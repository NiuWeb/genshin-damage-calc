import { artifact, effect, stats } from "@src/core"

export const ResolutionOfSojourner = artifact.Set({
    Name: "ResolutionOfSojourner",
    Stars: 4,

    Piece2: [
        effect.Factory({
            Name: "ResolutionOfSojourner2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.18)
                .Build()
        })
    ],
    Piece4: [
        effect.Factory({
            Name: "ResolutionOfSojourner4",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.CHARGED_ATTACK_CRIT_RATE)
                .Values(0.3)
                .Build()
        })
    ]
})