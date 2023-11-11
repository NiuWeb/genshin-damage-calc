import { effect, scaling, stats, weapon } from "@src/core"

export const SplendorOfTranquilWaters = weapon.Factory({
    Name: "SplendorOfTranquilWaters",
    Stars: 5,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_44b,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        effect.Factory({
            Name: "SplendorOfTranquilWaters1",
            MaxStacks: 3,
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG)
                .Values(0.08, 0.1, 0.12, 0.14, 0.16)
                .Stacks()
                .Build()
        }),

        effect.Factory({
            Name: "SplendorOfTranquilWaters2",
            MaxStacks: 2,
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.HP_PERCENT)
                .Values(0.14, 0.175, 0.21, 0.245, 0.28)
                .Stacks()
                .Build()
        })
    ]
})