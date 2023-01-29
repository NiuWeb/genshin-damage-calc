import { effect, scaling, stats, weapon } from "@src/core"

export const WanderingEvenstar = weapon.Factory({
    Name: "WanderingEvenstar",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "WanderingEvenstar1",
            StackSelf: true,
            ApplyOther: true,
            MaxRank: 5,

            OnApply: new effect.Builder()
                .observe.Owner(stats.stat.ELEMENTAL_MASTERY)
                .stat
                .Char(stats.stat.ATK_FLAT)
                .Values(0.24, 0.30, 0.36, 0.42, 0.48)
                .Map((v, t, e) => (
                    v * e.Owner.GetCharacter().Get(stats.stat.ELEMENTAL_MASTERY) * (
                        t === e.Owner ? 1 : 0.3
                    )
                ))
                .Build()
        })
    ]
})