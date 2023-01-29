import { effect, scaling, stats, weapon } from "@src/core"

export const SkyriderSword = weapon.Factory({
    Name: "SkyriderSword",
    Stars: 3,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_38,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        effect.Factory({
            Name: "SkyriderSword1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Build()
        })
    ]
})