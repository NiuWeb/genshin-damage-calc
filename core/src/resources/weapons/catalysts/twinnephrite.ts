import { effect, scaling, stats, weapon } from "@src/core"

export const TwinNephrite = weapon.Factory({
    Name: "TwinNephrite",
    Stars: 3,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_40,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "TwinNephrite1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.12, 0.14, 0.16, 0.18, 0.20)
                .Build()
        })
    ]
})