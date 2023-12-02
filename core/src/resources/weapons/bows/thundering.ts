import { effect, scaling, stats, weapon } from "@src/core"

export const ThunderingPulse = weapon.Factory({
    Name: "ThunderingPulse",
    Stars: 5,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        effect.Factory({
            Name: "ThunderingPulse1",
            MaxRank: 5,
            MaxStacks: 3,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Next()

                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG)
                .Stacks(
                    [0, 0.12, 0.24, 0.40],
                    [0, 0.15, 0.30, 0.50],
                    [0, 0.18, 0.36, 0.60],
                    [0, 0.21, 0.42, 0.70],
                    [0, 0.24, 0.48, 0.80]
                )
                .Build()
        })
    ]
})