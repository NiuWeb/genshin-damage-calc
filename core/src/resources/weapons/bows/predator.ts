import { effect, scaling, stats, weapon } from "@src/core"

export const Predator = weapon.Factory({
    Name: "Predator",
    Stars: 4,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "Predator1",
            MaxRank: 5,
            MaxStacks: 2,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.1)
                .Stacks()
                .Next()

                .Where({ target: { name: "Aloy" } })
                .stat
                .Char(stats.stat.ATK_FLAT)
                .Values(66)
                .Build()
        })
    ]
})