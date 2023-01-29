import { effect, scaling, stats, weapon } from "@src/core"

export const KitainCrossSpear = weapon.Factory({
    Name: "KitainCrossSpear",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "KitainCrossSpear1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG)
                .Values(0.06, 0.075, 0.09, 0.105, 0.12)
                .Build()
        })
    ]
})