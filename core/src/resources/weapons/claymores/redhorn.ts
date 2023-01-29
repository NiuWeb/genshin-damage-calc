import { effect, scaling, stats, weapon } from "@src/core"

export const RedhornStonethresher = weapon.Factory({
    Name: "RedhornStonethresher",
    Stars: 5,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_44b,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        effect.Factory({
            Name: "RedhornStonethresher1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.DEF_PERCENT)
                .Values(0.28, 0.35, 0.42, 0.49, 0.56)
                .Next()

                .observe.Target(stats.stat.DEF, stats.stat.DEF_PERCENT, stats.stat.DEF_FLAT)
                .stat
                .Char(stats.stat.NORMAL_ATTACK_DMG_FLAT)
                .Values(0.4, 0.5, 0.6, 0.7, 0.8)
                .Map((x, target) => (
                    x * target.GetCharacter().Get(stats.stat.DEF)
                ))
                .Build()
        })
    ]
})