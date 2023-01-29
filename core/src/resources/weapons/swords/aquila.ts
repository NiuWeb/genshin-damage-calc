import { effect, scaling, stats, weapon } from "@src/core"

export const AquilaFavonia = weapon.Factory({
    Name: "AquilaFavonia",
    Type: stats.weapon.SWORD,
    Stars: 5,
    Scaling: scaling.WeaponScaling.TYPE_48,
    Substat: stats.stat.PHYSICAL_DMG,

    Effects: [
        effect.Factory({
            Name: "AquilaFavonia1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Next()

                .instance
                .Basic({
                    Name: "HIT_AquilaFavonia",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [2, 2.3, 2.6, 2.9, 3.2]
                })
                .Build()
        })
    ]
})