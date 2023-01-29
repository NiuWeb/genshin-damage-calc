import { effect, scaling, stats, weapon } from "@src/core"

export const DarkIronSword = weapon.Factory({
    Name: "DarkIronSword",
    Stars: 3,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "DarkIronSword1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Build()
        })
    ]
})