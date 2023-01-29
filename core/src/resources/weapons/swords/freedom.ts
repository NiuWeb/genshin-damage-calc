import { effect, scaling, stats, weapon } from "@src/core"
import { MillennialMovement } from "../families/millenial"

export const FreedomSworn = weapon.Factory({
    Name: "FreedomSworn",
    Stars: 5,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "FreedomSworn1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.1, 0.125, 0.15, 0.175, 0.20)
                .Build()
        }),
        MillennialMovement({
            Name: "FreedomSworn2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG, stats.stat.PLUNGE_ATTACK_DMG)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Next()

                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Build()
        })
    ]
})