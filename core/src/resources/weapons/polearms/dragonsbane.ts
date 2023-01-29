import { effect, scaling, stats, weapon } from "@src/core"

export const DragonsBane = weapon.Factory({
    Name: "DragonsBane",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.ELEMENTAL_MASTERY,
    Effects: [
        effect.Factory({
            Name: "DragonsBane1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .Where({ enemy: { affected: [stats.stat.HYDRO_DMG, stats.stat.PYRO_DMG] } })
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.2, 0.24, 0.28, 0.32, 0.36)
                .Build()
        })
    ]
})