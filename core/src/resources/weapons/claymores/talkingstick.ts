import { effect, scaling, stats, weapon } from "@src/core"

export const TalkingStick = weapon.Factory({
    Name: "TalkingStick",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Substat: stats.stat.CRIT_RATE,
    Scaling: scaling.WeaponScaling.TYPE_44,

    Effects: [
        effect.Factory({
            Name: "TalkingStick1",
            MaxRank: 5,
            MaxAuras: 2,
            ValidAuras: [stats.aura.PYRO, stats.aura.HYDRO],
            OnApply: new effect.Builder()
                .Where({ effect: { aura: [stats.aura.PYRO] } })
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Next()

                .Where({ effect: { aura: [stats.aura.HYDRO] } })
                .stat
                .Char(...stats.Elements.filter(e => e !== stats.stat.PHYSICAL_DMG))
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Build()
        })
    ]
})