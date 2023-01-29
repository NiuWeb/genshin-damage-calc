import { effect, scaling, stats, weapon } from "@src/core"

export const SkywardBlade = weapon.Factory({
    Name: "SkywardBlade",
    Stars: 5,
    Type: stats.weapon.SWORD,
    Substat: stats.stat.ENERGY_RECHARGE,
    Scaling: scaling.WeaponScaling.TYPE_46,

    Effects: [
        effect.Factory({
            Name: "SkywardBlade1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.CRIT_RATE)
                .Values(0.04, 0.05, 0.06, 0.07, 0.08)
                .Next()

                .instance
                .Basic({
                    Name: "HIT_SkywardBlade",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [0.20, 0.25, 0.30, 0.35, 0.40]
                })
                .Build()
        })
    ]
})