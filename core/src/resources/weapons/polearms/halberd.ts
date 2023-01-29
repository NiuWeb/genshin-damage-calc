import { effect, scaling, stats, weapon } from "@src/core"

export const Halberd = weapon.Factory({
    Name: "Halberd",
    Stars: 3,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_40,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "Halberd1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_Halberd",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [1.6, 2, 2.4, 2.8, 3.2]
                })
                .Build()
        })
    ]
})