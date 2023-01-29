import { effect, scaling, stats, weapon } from "@src/core"

export const PrototypeStarglitter = weapon.Factory({
    Name: "PrototypeStarglitter",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ENERGY_RECHARGE,
    Effects: [
        effect.Factory({
            Name: "PrototypeStarglitter1",
            MaxStacks: 2,
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.08, 0.10, 0.12, 0.14, 0.16)
                .Stacks()
                .Next()

                .Build()
        })
    ]
})