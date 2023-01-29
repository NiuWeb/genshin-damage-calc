import { effect, scaling, stats, weapon } from "@src/core"

export const MissiveWindspear = weapon.Factory({
    Name: "MissiveWindspear",
    Type: stats.weapon.POLEARM,
    Stars: 4,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "MissiveWindspear1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()

                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Values(48, 60, 72, 84, 96)
                .Build()
        })
    ]
})