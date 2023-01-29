import { effect, scaling, stats, weapon } from "@src/core"

export const HarbingerOfDawn = weapon.Factory({
    Name: "HarbingerOfDawn",
    Stars: 3,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        effect.Factory({
            Name: "HarbingerOfDawn1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .Where({ target: { hp: { geq: 0.9 } } })
                .stat
                .Char(stats.stat.CRIT_RATE)
                .Values(0.14, 0.175, 0.21, 0.245, 0.28)
            .Build()
        })
    ]
})