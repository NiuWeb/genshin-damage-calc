import { effect, scaling, stats, weapon } from "@src/core"

export const LuxuriousSeaLord = weapon.Factory({
    Name: "LuxuriousSeaLord",
    Type: stats.weapon.CLAYMORE,
    Stars: 4,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "LuxuriousSeaLord1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_BURST_DMG)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()

                .instance
                .Basic({
                    Name: "HIT_LuxuriousSeaLord",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [1, 1.25, 1.5, 1.75, 2]
                })
                .Build()
        })
    ]
})