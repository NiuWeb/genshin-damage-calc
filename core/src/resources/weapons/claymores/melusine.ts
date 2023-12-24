import { effect, scaling, stats, weapon } from "@src/core"


const MaxStacks = 12

export const UltimateOverlordsMegaMagicSword = weapon.Factory({
    Name: "UltimateOverlordsMegaMagicSword",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Substat: stats.stat.ENERGY_RECHARGE,
    Scaling: scaling.WeaponScaling.TYPE_44,

    Effects: [
        effect.Factory({
            Name: "UltimateOverlordsMegaMagicSword1",
            MaxRank: 5,
            MaxStacks,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()

                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.12 / MaxStacks, 0.15 / MaxStacks, 0.18 / MaxStacks, 0.21 / MaxStacks, 0.24 / MaxStacks)
                .Stacks()
                .Build()
        })
    ]
})