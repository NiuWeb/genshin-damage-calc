import { effect, scaling, stats, weapon } from "@src/core"

export const EverlastingMoonglow = weapon.Factory({
    Name: "EverlastingMoonglow",
    Stars: 5,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.HP_PERCENT,

    Effects: [
        effect.Factory({
            Name: "EverlastingMoonglow1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.HEALING_BONUS)
                .Values(0.10, 0.125, 0.15, 0.175, 0.2)
                .Next()

                .observe.Target(stats.stat.HP_PERCENT, stats.stat.HP_BASE, stats.stat.HP_FLAT)
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG_FLAT)
                .Values(0.01, 0.015, 0.02, 0.025, 0.03)
                .Map((v, target) => (
                    v * target.GetCharacter().Get(stats.stat.HP)
                ))
                .Build()
        })
    ]
})