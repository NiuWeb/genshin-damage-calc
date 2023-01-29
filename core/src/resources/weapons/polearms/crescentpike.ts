import { effect, scaling, stats, weapon } from "@src/core"

export const CrescentPike = weapon.Factory({
    Name: "CrescentPike",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.PHYSICAL_DMG,

    Effects: [
        effect.Factory({
            Name: "CrescentPike1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_CrescentPike",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [0.2, 0.25, 0.3, 0.35, 0.4]
                })
                .Build()
        })
    ]
})