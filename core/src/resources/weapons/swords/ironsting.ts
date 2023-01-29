import { effect, scaling, stats, weapon } from "@src/core"

export const IronSting = weapon.Factory({
    Name: "IronSting",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "IronSting1",
            MaxRank: 5,
            MaxStacks: 2,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.06, 0.075, 0.09, 0.105, 0.12)
                .Stacks()
                .Build()
        })
    ]
})