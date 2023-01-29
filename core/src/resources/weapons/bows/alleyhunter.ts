import { effect, scaling, stats, weapon } from "@src/core"

export const AlleyHunter = weapon.Factory({
    Name: "AlleyHunter",
    Stars: 4,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "AlleyHunter1",
            MaxRank: 5,
            MaxStacks: 10,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.02, 0.025, 0.03, 0.035, 0.04)
                .Stacks()
                .Build()
        })
    ]
})