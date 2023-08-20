import { effect, scaling, stats, weapon } from "@src/core"

export const ScionOfTheBlazingSun = weapon.Factory({
    Name: "ScionOfTheBlazingSun",
    Stars: 4,
    Type: stats.weapon.BOW,
    Substat: stats.stat.CRIT_RATE,
    Scaling: scaling.WeaponScaling.TYPE_44,

    Effects: [
        effect.Factory({
            Name: "ScionOfTheBlazingSun1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .instance
                .Basic({
                    Name: "HIT_ScionOfTheBlazingSun",
                    Element: stats.stat.PHYSICAL_DMG,
                    Stat: stats.stat.ATK,
                    Values: [0.6, 0.75, 0.9, 1.05, 1.2]
                })
                .Next()

                .stat
                .Char(stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.28, 0.35, 0.42, 0.49, 0.56)
                .Build()
        })
    ]
})