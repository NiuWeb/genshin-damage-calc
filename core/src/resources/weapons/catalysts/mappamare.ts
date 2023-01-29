import { effect, scaling, stats, weapon } from "@src/core"

export const MappaMare = weapon.Factory({
    Name: "MappaMare",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ELEMENTAL_MASTERY,
    Effects: [
        effect.Factory({
            Name: "MappaMare1",
            MaxRank: 5,
            MaxStacks: 2,
            OnApply: new effect.Builder()
                .stat
                .Char(...stats.Elements.filter(s => s !== stats.stat.PHYSICAL_DMG))
                .Values(0.08, 0.10, 0.12, 0.14, 0.16)
                .Stacks()
                .Build()
        })
    ]
})