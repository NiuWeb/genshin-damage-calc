import { effect, scaling, stats, weapon } from "@src/core"

export const WolfsGravestone = weapon.Factory({
    Name: "WolfsGravestone",
    Stars: 5,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "WolfsGravestone1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Build()
        }),
        effect.Factory({
            Name: "WolfsGravestone2",
            MaxRank: 5,
            ApplyOther: true,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.4, 0.5, 0.6, 0.7, 0.8)
                .Build()
        }),
    ]
})