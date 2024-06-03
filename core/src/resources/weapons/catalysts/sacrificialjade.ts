import { effect, scaling, stats, weapon } from "@src/core"

export const SacrificialJade = weapon.Factory({
    Name: "SacrificialJade",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Substat: stats.stat.CRIT_RATE,
    Scaling: scaling.WeaponScaling.TYPE_41,

    Effects: [
        effect.Factory({
            Name: "SacrificialJade1",
            MaxRank: 5,
            Conditions: ["OFF_FIELD"],
            MaxConditions: 1,

            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["OFF_FIELD"] } })
                .stat
                .Char(stats.stat.HP_PERCENT)
                .Values(0.32, 0.4, 0.48, 0.56, 0.64)
                .Next()
                .Where({ effect: { conditions: ["OFF_FIELD"] } })
                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Values(40, 50, 60, 70, 80)
                .Build()
        })
    ]
})