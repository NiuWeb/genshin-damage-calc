import { effect, scaling, stats, weapon } from "@src/core"

export const ToukabouShigure = weapon.Factory({
    Name: "ToukabouShigure",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "ToukabouShigure1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.16, 0.20, 0.24, 0.28, 0.32)
                .Build()
        })
    ]
})