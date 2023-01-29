import { effect, scaling, stats, weapon } from "@src/core"

export const KatsuragikiriNagamasa = weapon.Factory({
    Name: "KatsuragikiriNagamasa",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        effect.Factory({
            Name: "KatsuragikiriNagamasa1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG)
                .Values(0.06, 0.075, 0.09, 0.105, 0.12)
                .Build()
        })
    ]
})