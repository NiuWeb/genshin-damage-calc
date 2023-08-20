import { effect, scaling, stats, weapon } from "@src/core"

export const FleuveCendreFerryman = weapon.Factory({
    Name: "FleuveCendreFerryman",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Substat: stats.stat.ENERGY_RECHARGE,
    Scaling: scaling.WeaponScaling.TYPE_42,

    Effects: [
        effect.Factory({
            Name: "FleuveCendreFerryman1",
            MaxRank: 5,
            Conditions: ["CAST_SKILL"],
            MaxConditions: 1,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_CRIT_RATE)
                .Values(0.08, 0.1, 0.12, 0.14, 0.16)
                .Next()

                .Where({ effect: { conditions: ["CAST_SKILL"] } })
                .stat
                .Char(stats.stat.ENERGY_RECHARGE)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Build()
        })
    ]
})