import { effect, scaling, stats, weapon } from "@src/core"

export const KagotsurubeIsshin = weapon.Factory({
    Name: "KagotsurubeIsshin",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "KagotsurubeIsshin1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_KagotsurubeIsshin",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [1.8]
                })
                .Next()

                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.15)
                .Build()
        })
    ]
})