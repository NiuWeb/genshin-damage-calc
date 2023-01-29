import { effect, scaling, stats, weapon } from "@src/core"

export const CompoundBow = weapon.Factory({
    Name: "CompoundBow",
    Stars: 4,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.PHYSICAL_DMG,

    Effects: [
        effect.Factory({
            Name: "CompoundBow1",
            MaxRank: 5,
            MaxStacks: 4,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.04, 0.05, 0.06, 0.07, 0.08)
                .Stacks()
                .Build()
        })
    ]
})