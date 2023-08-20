import { effect, scaling, stats, weapon } from "@src/core"

export const SongOfStillness = weapon.Factory({
    Name: "SongOfStillness",
    Stars: 4,
    Type: stats.weapon.BOW,
    Substat: stats.stat.ATK_PERCENT,
    Scaling: scaling.WeaponScaling.TYPE_42,

    Effects: [
        effect.Factory({
            Name: "SongOfStillness1",
            MaxRank: 5,
            MaxConditions: 1,
            Conditions: ["HEALED"],
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["HEALED"] } })
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Build()
        })
    ]
})