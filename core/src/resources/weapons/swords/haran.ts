import { effect, scaling, stats, weapon } from "@src/core"

export const HaranGeppakuFutsu = weapon.Factory({
    Name: "HaranGeppakuFutsu",
    Stars: 5,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "HaranGeppakuFutsu1",
            MaxRank: 5,
            MaxStacks: 2,
            OnApply: new effect.Builder()
                .stat
                .Char(...stats.Elements.filter(s => s !== stats.stat.PHYSICAL_DMG))
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()

                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Stacks()
                .Build()
        })
    ]
})