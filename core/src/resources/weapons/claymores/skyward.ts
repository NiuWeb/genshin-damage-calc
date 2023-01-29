import { effect, scaling, stats, weapon } from "@src/core"

export const SkywardPride = weapon.Factory({
    Name: "SkywardPride",
    Stars: 5,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_48,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        effect.Factory({
            Name: "SkywardPride1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.08, 0.10, 0.12, 0.14, 0.16)
                .Next()

                .instance
                .Basic({
                    Name: "HIT_SkywardPride",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [0.8, 1, 1.2, 1.4, 1.6]
                })
                .Build()
        })
    ]
})