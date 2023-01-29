import { effect, scaling, stats, weapon } from "@src/core"

export const AquaSimulacra = weapon.Factory({
    Name: "AquaSimulacra",
    Stars: 5,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_44b,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        effect.Factory({
            Name: "AquaSimulacra1",
            MaxRank: 5,
            Conditions: ["FAR", "NEAR"],
            MaxConditions: 1,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.HP_PERCENT)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Next()

                .Where({ effect: { conditions: ["NEAR"] } })
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)


                .Build()
        })
    ]
})