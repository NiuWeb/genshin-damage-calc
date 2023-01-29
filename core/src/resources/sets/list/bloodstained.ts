import { artifact, effect, stats } from "@src/core"

export const BloodstainedChivalry = artifact.Set({
    Name: "BloodstainedChivalry",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "BloodstainedChivalry2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.PHYSICAL_DMG)
                .Values(0.25)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "BloodstainedChivalry4",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.5)
                .Build()
        })]
})