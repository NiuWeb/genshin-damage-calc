import { artifact, effect, stats } from "@src/core"

export const MarechausseeHunter = artifact.Set({
    Name: "MarechausseeHunter",
    Stars: 5,
    Piece2: [
        effect.Factory({
            Name: "MarechausseeHunter2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.15)
                .Build()
        })
    ],
    Piece4: [
        effect.Factory({
            Name: "MarechausseeHunter4",
            MaxStacks: 3,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.CRIT_RATE)
                .Values(0.12)
                .Stacks()
                .Build(),
        })
    ]
})