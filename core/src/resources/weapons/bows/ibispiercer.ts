import { effect, scaling, stats, weapon } from "@src/core"

export const IbisPiercer = weapon.Factory({
    Name: "IbisPiercer",
    Type: stats.weapon.BOW,
    Stars: 4,

    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "IbisPiercer1",
            MaxRank: 5,
            MaxStacks: 2,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Values(40, 50, 60, 70, 80)
                .Stacks()
                .Build()
        })
    ]
})