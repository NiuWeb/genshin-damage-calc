import { effect, scaling, stats, weapon } from "@src/core"

export const LionsRoar = weapon.Factory({
    Name: "LionsRoar",
    Stars: 4,
    Type: stats.weapon.SWORD,

    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "LionsRoar1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .Where({ enemy: { affected: [stats.stat.PYRO_DMG, stats.stat.ELECTRO_DMG] } })
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.2, 0.24, 0.28, 0.32, 0.36)
                .Build()
        })
    ]
})