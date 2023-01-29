import { effect, scaling, stats, weapon } from "@src/core"

export const TulaytullahsRemembrance = weapon.Factory({
    Name: "TulaytullahsRemembrance",
    Stars: 5,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_48,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        effect.Factory({
            Name: "TulaytullahsRemembrance1",
            MaxRank: 5,
            MaxStacks: 10,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG)
                .Values(0.048, 0.06, 0.072, 0.084, 0.096)
                .Stacks()
                .Build()
        })
    ]
})