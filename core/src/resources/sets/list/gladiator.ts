import { artifact, effect, stats } from "@src/core"

export const GladiatorsFinale = artifact.Set({
    Name: "GladiatorsFinale",
    Stars: 5,
    Piece2: [
        effect.Factory({
            Name: "GladiatorsFinale2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.18)
                .Build()
        })
    ],
    Piece4: [
        effect.Factory({
            Name: "GladiatorsFinale4",
            OnApply: new effect.Builder()
                .Where({ target: { weapon: [stats.weapon.CLAYMORE, stats.weapon.SWORD, stats.weapon.POLEARM] } })
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG)
                .Values(0.35)
                .Build()
        })
    ]
})