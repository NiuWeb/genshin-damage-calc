import { effect, scaling, stats, weapon } from "@src/core"

export const TheFlute = weapon.Factory({
    Name: "TheFlute",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "TheFlute1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_TheFlute",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [1, 1.25, 1.5, 1.75, 2]
                })
                .Build()
        })
    ]
})