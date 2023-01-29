import { effect, scaling, stats, weapon } from "@src/core"

export const EyeOfPerception = weapon.Factory({
    Name: "EyeOfPerception",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "EyeOfPerception1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_EyeOfPerception",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [2.4, 2.7, 3, 3.3, 3.6]
                })
                .Build()
        })
    ]
})