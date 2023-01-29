import { effect, scaling, stats, weapon } from "@src/core"

export const FesteringDesire = weapon.Factory({
    Name: "FesteringDesire",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        effect.Factory({
            Name: "FesteringDesire1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Next()

                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_CRIT_RATE)
                .Values(0.06, 0.075, 0.09, 0.105, 0.12)
                .Build()
        })
    ]
})