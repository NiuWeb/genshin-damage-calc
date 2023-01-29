import { effect, scaling, stats, weapon } from "@src/core"

export const Messenger = weapon.Factory({
    Name: "Messenger",
    Type: stats.weapon.BOW,
    Stars: 3,
    Scaling: scaling.WeaponScaling.TYPE_40,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        effect.Factory({
            Name: "Messenger1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_Messenger",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [1, 1.25, 1.5, 1.75, 2]
                })
                .Build()
        })
    ]
})