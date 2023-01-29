import { effect, scaling, stats, weapon } from "@src/core"

export const KingsSquire = weapon.Factory({
    Name: "KingsSquire",
    Type: stats.weapon.BOW,
    Stars: 4,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "KingsSquire1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Values(60, 80, 100, 120, 140)
                .Next()

                .instance
                .Basic({
                    Name: "HIT_KingsSquire",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [1, 1.2, 1.4, 1.6, 1.8]
                })
                .Build()
        })
    ]
})