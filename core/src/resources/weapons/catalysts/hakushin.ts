import { effect, scaling, stats, weapon } from "@src/core"

export const HakushinRing = weapon.Factory({
    Name: "HakushinRing",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        effect.Factory({
            Name: "HakushinRing1",
            ApplyOther: true,
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char()
                .MapStat(tg => [tg.GetCharacter().Options.Element])
                .Values(0.10, 0.125, 0.15, 0.175, 0.2)
                .Build()
        })
    ]
})