import { effect, scaling, stats, weapon } from "@src/core"

export const TheStringless = weapon.Factory({
    Name: "TheStringless",
    Stars: 4,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "TheStringless1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG, stats.stat.ELEMENTAL_BURST_DMG)
                .Values(0.24, 0.30, 0.36, 0.42, 0.48)
                .Build()
        })
    ]
})