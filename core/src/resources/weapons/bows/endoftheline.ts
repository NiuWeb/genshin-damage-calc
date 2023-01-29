import { effect, scaling, stats, weapon } from "@src/core"

export const EndOfTheLine = weapon.Factory({
    Name: "EndOfTheLine",
    Stars: 4,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        effect.Factory({
            Name: "EndOfTheLine1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_EndOfTheLine",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [0.8, 1, 1.2, 1.4, 1.6]
                })
                .Build()
        })
    ]
})