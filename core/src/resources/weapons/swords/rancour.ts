import { effect, scaling, stats, weapon } from "@src/core"

export const PrototypeRancour = weapon.Factory({
    Name: "PrototypeRancour",
    Stars: 4,
    Type: stats.weapon.SWORD,

    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.PHYSICAL_DMG,

    Effects: [
        effect.Factory({
            Name: "PrototypeRancour1",
            MaxRank: 5,
            MaxStacks: 4,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT, stats.stat.DEF_PERCENT)
                .Values(0.04, 0.05, 0.06, 0.07, 0.08)
                .Stacks()
                .Build()
        })
    ]
})