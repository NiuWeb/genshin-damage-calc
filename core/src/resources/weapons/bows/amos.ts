import { effect, scaling, stats, weapon } from "@src/core"

export const AmosBow = weapon.Factory({
    Name: "AmosBow",
    Stars: 5,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "AmosBow1",
            MaxRank: 5,
            MaxStacks: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()

                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.08, 0.10, 0.12, 0.14, 0.16)
                .Stacks()

                .Build()
        })
    ]
})