import { effect, scaling, stats, weapon } from "@src/core"

export const TheViridescentHunt = weapon.Factory({
    Name: "TheViridescentHunt",
    Stars: 4,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "TheViridescentHunt1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_TheViridescentHunt",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [0.4, 0.5, 0.6, 0.7, 0.8]
                })
                .Build()
        })
    ]
})