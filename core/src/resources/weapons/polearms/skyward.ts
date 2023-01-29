import { effect, scaling, stats, weapon } from "@src/core"

export const SkywardSpine = weapon.Factory({
    Name: "SkywardSpine",
    Stars: 5,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_48,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        effect.Factory({
            Name: "SkywardSpine1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.CRIT_RATE)
                .Values(0.08, 0.1, 0.12, 0.14, 0.16)
                .Next()

                .instance
                .Basic({
                    Name: "HIT_SkywardSpine",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [0.4, 0.55, 0.7, 0.85, 1]
                })
                .Build()
        })
    ]
})