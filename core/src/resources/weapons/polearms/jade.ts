import { effect, scaling, stats, weapon } from "@src/core"

export const JadeSpear = weapon.Factory({
    Name: "JadeSpear",
    Stars: 5,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_48,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "JadeSpear1",
            MaxRank: 5,
            MaxStacks: 7,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.032, 0.039, 0.046, 0.053, 0.06)
                .Stacks()
                .Next()

                .stat
                .Char(stats.stat.ALL_DMG)
                .Stacks(
                    [0, 0, 0, 0, 0, 0, 0, 0.12],
                    [0, 0, 0, 0, 0, 0, 0, 0.15],
                    [0, 0, 0, 0, 0, 0, 0, 0.18],
                    [0, 0, 0, 0, 0, 0, 0, 0.21],
                    [0, 0, 0, 0, 0, 0, 0, 0.24],
                )
                .Build()
        })
    ]
})