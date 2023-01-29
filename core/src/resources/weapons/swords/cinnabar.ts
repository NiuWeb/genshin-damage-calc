import { effect, scaling, stats, weapon } from "@src/core"

export const CinnabarSpindle = weapon.Factory({
    Name: "CinnabarSpindle",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.DEF_PERCENT,

    Effects: [
        effect.Factory({
            Name: "CinnabarSpindle1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .mv
                .Mv(stats.stat.DEF, 0.4, s => s.Options.Talent === stats.stat.ELEMENTAL_SKILL_DMG)
                .Map((_, __, ef) => (
                    [0.4, 0.5, 0.6, 0.7, 0.8][ef.GetRank() - 1]
                ))
                .Build()
        })
    ]
})