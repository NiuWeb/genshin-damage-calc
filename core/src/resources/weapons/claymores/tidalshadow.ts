import { effect, scaling, stats, weapon } from "@src/core"

export const TidalShadow = weapon.Factory({
    Name: "TidalShadow",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Substat: stats.stat.ATK_PERCENT,
    Scaling: scaling.WeaponScaling.TYPE_42,

    Effects: [
        effect.Factory({
            Name: "TidalShadow1",
            MaxRank: 5,
            Conditions: ["HEALED"],
            MaxConditions: 1,
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["HEALED"] } })
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.24, 0.3, 0.36, 0.42, 0.48)
                .Build()
        })
    ]
})