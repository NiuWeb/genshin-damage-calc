import { effect, scaling, stats, weapon } from "@src/core"

export const BlackTassel = weapon.Factory({
    Name: "BlackTassel",
    Stars: 3,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_38,
    Substat: stats.stat.HP_PERCENT,

    Effects: [
        effect.Factory({
            Name: "BlackTassel1",
            MaxRank: 5,
            Conditions: ["NO_SLIMES", "SLIMES"],
            MaxConditions: 1,
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["SLIMES"] } })
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.4, 0.5, 0.6, 0.7, 0.8)
                .Build()
        })
    ]
})