import { effect, scaling, stats, weapon } from "@src/core"

export const Slingshot = weapon.Factory({
    Name: "Slingshot",
    Stars: 3,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_38,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "Slingshot1",
            MaxRank: 5,
            Conditions: ["FAR", "NEAR"],
            MaxConditions: 1,
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["FAR"] } })
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.36, 0.42, 0.48, 0.54, 0.6)
                .Next()

                .Where({ effect: { conditions: ["NEAR"] } })
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
                .Values(-0.10)

                .Build()
        })
    ]
})