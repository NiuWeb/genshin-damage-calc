import { effect, scaling, stats, weapon } from "@src/core"

export const Deathmatch = weapon.Factory({
    Name: "Deathmatch",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.CRIT_RATE,
    Effects: [
        effect.Factory({
            Name: "Deathmatch1",
            MaxRank: 5,
            MaxConditions: 1,
            Conditions: ["ENEMY_1", "ENEMY_2"],
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["ENEMY_2"] } })
                .stat
                .Char(stats.stat.ATK_PERCENT, stats.stat.DEF_PERCENT)
                .Values(0.16, 0.20, 0.24, 0.28, 0.32)
                .Next()

                .Where({ effect: { conditions: ["ENEMY_1"] } })
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.24, 0.30, 0.36, 0.42, 0.48)

                .Build()
        })
    ]
})