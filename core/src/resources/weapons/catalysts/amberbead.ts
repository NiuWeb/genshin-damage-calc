import { effect, scaling, stats, weapon } from "@src/core"

export const AmberBead = weapon.Factory({
    Name: "AmberBead",
    Stars: 3,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "AmberBead1",
            MaxRank: 5,
            MaxStacks: 2,
            OnApply: new effect.Builder()
                .stat
                .Char(...stats.Elements.filter(s => s !== stats.stat.PHYSICAL_DMG))
                .Values(0.06, 0.075, 0.09, 0.105, 0.12)
                .Stacks()
                .Build()
        })
    ]
})