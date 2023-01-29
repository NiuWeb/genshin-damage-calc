import { effect, scaling, stats, weapon } from "@src/core"

export const Rust = weapon.Factory({
    Name: "Rust",
    Type: stats.weapon.BOW,
    Stars: 4,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "Rust1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG)
                .Values(0.4, 0.5, 0.6, 0.7, 0.8)
                .Next()

                .stat
                .Char(stats.stat.CHARGED_ATTACK_DMG)
                .Values(-0.1)
                .Build()
        })
    ]
})