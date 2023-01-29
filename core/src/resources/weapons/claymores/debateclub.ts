import { effect, scaling, stats, weapon } from "@src/core"

export const DebateClub = weapon.Factory({
    Name: "DebateClub",
    Stars: 3,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "DebateClub1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_DebateClub",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [0.6, 0.75, 0.9, 1.05, 1.2]
                })
                .Build()
        })
    ]
})