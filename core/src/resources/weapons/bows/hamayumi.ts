import { effect, scaling, stats, weapon } from "@src/core"

export const Hamayumi = weapon.Factory({
    Name: "Hamayumi",
    Stars: 4,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "Hamayumi1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Next()

                .stat
                .Char(stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()

                .Where({ target: { energy: { geq: 1 } } })
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Next()

                .Where({ target: { energy: { geq: 1 } } })
                .stat
                .Char(stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()

                .Build()
        })
    ]
})