import { effect, scaling, stats, weapon } from "@src/core"

export const FilletBlade = weapon.Factory({
    Name: "FilletBlade",
    Stars: 3,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "FilletBlade1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_FilletBlade",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [2.4, 2.8, 3.2, 3.6, 4]
                })
                .Build()
        })
    ]
})