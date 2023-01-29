import { effect, scaling, stats, weapon } from "@src/core"

export const PrototypeCrescent = weapon.Factory({
    Name: "PrototypeCrescent",
    Stars: 4,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "PrototypeCrescent1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.36, 0.45, 0.54, 0.63, 0.72)
                .Build()
        })
    ]
})