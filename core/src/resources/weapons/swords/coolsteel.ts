import { effect, scaling, stats, weapon } from "@src/core"

export const CoolSteel = weapon.Factory({
    Name: "CoolSteel",
    Stars: 3,
    Type: stats.weapon.SWORD,

    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "CoolSteel1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .Where({ enemy: { affected: [stats.stat.CRYO_DMG, stats.stat.HYDRO_DMG] } })
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Build()
        })
    ]
})