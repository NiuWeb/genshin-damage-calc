import { effect, scaling, stats, weapon } from "@src/core"

export const Rainslasher = weapon.Factory({
    Name: "Rainslasher",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "Rainslasher1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .Where({ enemy: { affected: [stats.stat.HYDRO_DMG, stats.stat.ELECTRO_DMG] } })
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.2, 0.24, 0.28, 0.32, 0.36)
                .Build()
        })
    ]
})