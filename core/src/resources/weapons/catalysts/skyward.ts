import { effect, scaling, stats, weapon } from "@src/core"

export const SkywardAtlas = weapon.Factory({
    Name: "SkywardAtlas",
    Stars: 5,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_48,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "SkywardAtlas1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(...stats.Elements.filter(s => s !== stats.stat.PHYSICAL_DMG))
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()

                .instance
                .Basic({
                    Name: "HIT_SkywardAtlas",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [1.6, 2, 2.4, 4.8, 3.2]
                })
                .Build()
        })
    ]
})