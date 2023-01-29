import { effect, scaling, stats, weapon } from "@src/core"

export const OathswornEye = weapon.Factory({
    Name: "OathswornEye",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "OathswornEye1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ENERGY_RECHARGE)
                .Values(0.24, 0.30, 0.36, 0.42, 0.48)
                .Build()
        })
    ]
})