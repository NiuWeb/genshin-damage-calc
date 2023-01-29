import { artifact, effect, stats } from "@src/core"

export const HeartOfDepth = artifact.Set({
    Name: "HeartOfDepth",
    Stars: 5,

    Piece2: [
        effect.Factory({
            Name: "HeartOfDepth2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.HYDRO_DMG)
                .Values(0.15)
                .Build()
        })
    ],

    Piece4: [
        effect.Factory({
            Name: "HeartOfDepth4",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.3)
                .Build()
        })
    ]
})