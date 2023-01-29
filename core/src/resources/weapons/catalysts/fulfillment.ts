import { effect, scaling, stats, weapon } from "@src/core"

export const FruitOfFulfillment = weapon.Factory({
    Name: "FruitOfFulfillment",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        effect.Factory({
            Name: "FruitOfFulfillment1",
            MaxRank: 5,
            MaxStacks: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Values(24, 27, 30, 33, 36)
                .Stacks()
                .Next()

                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(-0.05)
                .Stacks()
                .Build()
        })
    ]
})