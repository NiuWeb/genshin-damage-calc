import { effect, scaling, stats, weapon } from "@src/core"

export const JadeCutter = weapon.Factory({
    Name: "JadeCutter",
    Stars: 5,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_44b,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "JadeCutter1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.HP_PERCENT)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Next()

                .observe.Target(stats.stat.HP_PERCENT, stats.stat.HP_FLAT, stats.stat.HP_BASE)
                .stat
                .Char(stats.stat.ATK_FLAT)
                .Values(0.012, 0.015, 0.018, 0.021, 0.024)
                .Map((x, target) => (
                    x * target.GetCharacter().Get(stats.stat.HP)
                ))
                .Build()
        })
    ]
})