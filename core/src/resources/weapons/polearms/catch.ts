import { effect, scaling, stats, weapon } from "@src/core"

export const TheCatch = weapon.Factory({
    Name: "TheCatch",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        effect.Factory({
            Name: "TheCatch1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_BURST_DMG)
                .Values(0.16, 0.20, 0.24, 0.28, 0.32)
                .Next()

                .stat
                .Char(stats.stat.ELEMENTAL_BURST_CRIT_RATE)
                .Values(0.06, 0.075, 0.09, 0.105, 0.12)
                .Build()
        })
    ]
})