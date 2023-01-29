import { effect, scaling, stats, weapon } from "@src/core"

export const KagurasVerity = weapon.Factory({
    Name: "KagurasVerity",
    Stars: 5,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        effect.Factory({
            Name: "KagurasVerity1",
            MaxRank: 5,
            MaxStacks: 3,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Stacks()
                .Next()

                .stat
                .Char(...stats.Elements.filter(s => s !== stats.stat.PHYSICAL_DMG))
                .Stacks(
                    [0, 0, 0, 0.12],
                    [0, 0, 0, 0.15],
                    [0, 0, 0, 0.18],
                    [0, 0, 0, 0.21],
                    [0, 0, 0, 0.24],
                )
                .Build()
        })
    ]
})