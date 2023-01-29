import { effect, scaling, stats, weapon } from "@src/core"

export const MagicGuide = weapon.Factory({
    Name: "MagicGuide",
    Type: stats.weapon.CATALYST,
    Stars: 3,
    Scaling: scaling.WeaponScaling.TYPE_38,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "MagicGuide1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .Where({ enemy: { affected: [stats.stat.HYDRO_DMG, stats.stat.ELECTRO_DMG] } })
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Build()
        })
    ]
})