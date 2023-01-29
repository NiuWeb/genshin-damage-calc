import { effect, scaling, stats, weapon } from "@src/core"

export const SharpshootersOath = weapon.Factory({
    Name: "SharpshootersOath",
    Stars: 3,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        effect.Factory({
            Name: "SharpshootersOath1",
            Conditions: ["WEAK_SPOT"],
            MaxConditions: 1,
            MaxRank: 5,
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["WEAK_SPOT"] } })
                .stat
                .Char(stats.stat.AIMED_SHOT_DMG)
                .Values(0.24, 0.30, 0.36, 0.42, 0.48)
                .Build()
        })
    ]
})