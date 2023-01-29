import { effect, scaling, stats, weapon } from "@src/core"

export const PolarStar = weapon.Factory({
    Name: "PolarStar",
    Stars: 5,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "PolarStar1",
            MaxRank: 5,
            MaxStacks: 4,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Stacks(
                    [0, 0.1, 0.2, 0.3, 0.48],
                    [0, 0.125, 0.25, 0.375, 0.60],
                    [0, 0.15, 0.30, 0.45, 0.72],
                    [0, 0.175, 0.35, 0.525, 0.84],
                    [0, 0.20, 0.40, 0.60, 0.96]
                )
                .Build()
        })
    ]
})