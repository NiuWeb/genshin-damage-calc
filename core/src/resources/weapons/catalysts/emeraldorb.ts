import { effect, scaling, stats, weapon } from "@src/core"

export const EmeraldOrb = weapon.Factory({
    Name: "EmeraldOrb",
    Stars: 3,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_40,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "EmeraldOrb1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Build()
        })
    ]
})