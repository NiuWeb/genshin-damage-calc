import { effect, scaling, stats, weapon } from "@src/core"

export const TheBlackSword = weapon.Factory({
    Name: "TheBlackSword",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "TheBlackSword1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG, stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Build()
        })
    ]
})