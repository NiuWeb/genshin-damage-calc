import { effect, scaling, stats, weapon } from "@src/core"

export const TheBell = weapon.Factory({
    Name: "TheBell",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.HP_PERCENT,

    Effects: [
        effect.Factory({
            Name: "TheBell1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .Where({ target: { shielded: true } })
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Build()
        })
    ]
})