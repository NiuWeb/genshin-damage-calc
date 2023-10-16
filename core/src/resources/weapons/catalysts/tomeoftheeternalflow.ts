import { effect, scaling, stats, weapon } from "@src/core";

export const TomeOfTheEternalFlow = weapon.Factory({
    Name: "TomeOfTheEternalFlow",
    Stars: 5,
    Type: stats.weapon.CATALYST,
    Substat: stats.stat.CRIT_DMG,
    Scaling: scaling.WeaponScaling.TYPE_44b,

    Effects: [
        effect.Factory({
            Name: "TomeOfTheEternalFlow1",
            MaxStacks: 3,
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.HP_PERCENT)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Next()
                .stat
                .Char(stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.14, 0.18, 0.22, 0.26, 0.3)
                .Stacks()
                .Build()
        })
    ]
})