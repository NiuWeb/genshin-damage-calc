import { effect, scaling, stats, weapon } from "@src/core"

export const FerrousShadow = weapon.Factory({
    Name: "FerrousShadow",
    Stars: 3,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.HP_PERCENT,

    Effects: [
        effect.Factory({
            Name: "FerrousShadow1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .Where({ target: { hp: { leq: 0.7 } } })
                .stat
                .Char(stats.stat.CHARGED_ATTACK_DMG)
                .Values(0.3, 0.35, 0.4, 0.45, 0.5)
                .Build()
        })
    ]
})