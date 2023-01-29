import { effect, scaling, stats, weapon } from "@src/core"

export const SwordOfDescension = weapon.Factory({
    Name: "SwordOfDescension",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_39b,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "SwordOfDescension1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_SwordOfDescension",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [2]
                })
                .Next()

                .Where({ target: { name: /traveler/i } })
                .stat
                .Char(stats.stat.ATK_FLAT)
                .Values(66)
                .Build()
        })
    ]
})