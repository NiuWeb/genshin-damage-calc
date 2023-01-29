import { effect, scaling, stats, weapon } from "@src/core"

export const StaffOfTheScarletSands = weapon.Factory({
    Name: "StaffOfTheScarletSands",
    Stars: 5,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_44b,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "StaffOfTheScarletSands1",
            MaxRank: 5,
            MaxStacks: 3,
            OnApply: new effect.Builder()
                .observe.Target(stats.stat.ELEMENTAL_MASTERY)
                .stat
                .Char(stats.stat.ATK_FLAT)
                .Values(0.52, 0.65, 0.78, 0.91, 1.04)
                .Map((v, t) => (
                    v * t.GetCharacter().Get(stats.stat.ELEMENTAL_MASTERY)
                ))
                .Next()

                .observe.Target(stats.stat.ELEMENTAL_MASTERY)
                .stat
                .Char(stats.stat.ATK_FLAT)
                .Values(0.28, 0.35, 0.42, 0.49, 0.56)
                .Stacks()
                .Map((v, t) => (
                    v * t.GetCharacter().Get(stats.stat.ELEMENTAL_MASTERY)
                ))
                .Next()
                .Build()
        })
    ]
})