import { effect, scaling, stats, weapon } from "@src/core"

export const FadingTwilight = weapon.Factory({
    Name: "FadingTwilight",
    Stars: 4,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        effect.Factory({
            Name: "FadingTwilight1",
            MaxRank: 5,
            MaxStacks: 3,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ALL_DMG)
                .Stacks(
                    [0, 0.06, 0.10, 0.14],
                    [0, 0.075, 0.125, 0.175],
                    [0, 0.09, 0.15, 0.21],
                    [0, 0.105, 0.175, 0.245],
                    [0, 0.12, 0.20, 0.28]
                )
                .Build()
        })
    ]
})