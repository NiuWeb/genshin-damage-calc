import { effect, scaling, stats, weapon } from "@src/core"

export const WhiteTassel = weapon.Factory({
    Name: "WhiteTassel",
    Stars: 3,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "WhiteTassel1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG)
                .Values(0.24, 0.30, 0.36, 0.42, 0.48)
                .Build()
        })
    ]
})