import { effect, scaling, stats, weapon } from "@src/core"

export const SkywardHarp = weapon.Factory({
    Name: "SkywardHarp",
    Type: stats.weapon.BOW,
    Stars: 5,

    Scaling: scaling.WeaponScaling.TYPE_48,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "SkywardHarp1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.CRIT_DMG)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Next()

                .instance
                .Basic({
                    Name: "HIT_SkywardHarp",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [1.25]
                })
                .Build()
        })
    ]
})