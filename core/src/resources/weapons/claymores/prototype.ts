import { effect, scaling, stats, weapon } from "@src/core"

export const PrototypeArchaic = weapon.Factory({
    Name: "PrototypeArchaic",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "PrototypeArchaic1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_PrototypeArchaic",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [2.4, 3, 3.6, 4.2, 4.8]
                })
                .Build()
        })
    ]
})