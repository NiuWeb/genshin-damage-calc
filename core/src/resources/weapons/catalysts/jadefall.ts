import { effect, scaling, stats, weapon } from "@src/core"

export const JadefallSplendor = weapon.Factory({
    Name: "JadefallSplendor",
    Type: stats.weapon.CATALYST,
    Stars: 5,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.HP_PERCENT,

    Effects: [
        effect.Factory({
            Name: "JadefallSplendor1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .observe.Owner(
                    stats.stat.HP_PERCENT,
                    stats.stat.HP_BASE,
                    stats.stat.HP_FLAT
                )
                .stat
                .MapStat(box => [box.GetCharacter().Options.Element])
                .Values(0.3, 0.5, 0.7, 0.9, 1.1)
                .Map((x, box, ef) => (
                    Math.min(
                        [0.12, 0.2, 0.28, 0.36, 0.44][ef.GetRank() - 1],
                        x / 100 * box.GetCharacter().Get(stats.stat.HP) / 1000
                    )
                ))
                .Build()
        })
    ]
})