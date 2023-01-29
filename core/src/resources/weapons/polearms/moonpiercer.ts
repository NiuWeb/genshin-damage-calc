import { effect, scaling, stats, weapon } from "@src/core"

export const Moonpiercer = weapon.Factory({
    Name: "Moonpiercer",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "Moonpiercer1",
            ApplyOther: true,
            MaxTargets: 1,
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Build()
        })
    ]
})