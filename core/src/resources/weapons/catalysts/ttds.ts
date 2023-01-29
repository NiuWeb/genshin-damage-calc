import { effect, scaling, stats, weapon } from "@src/core"

export const ThrillingTalesOfDragonSlayers = weapon.Factory({
    Name: "ThrillingTalesOfDragonSlayers",
    Stars: 3,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.HP_PERCENT,

    Effects: [
        effect.Factory({
            Name: "ThrillingTalesOfDragonSlayers1",
            MaxRank: 5,
            ApplySelf: false,
            ApplyOther: true,
            MaxTargets: 1,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.24, 0.30, 0.36, 0.42, 0.48)
                .Build()
        })
    ]
})