import { effect, scaling, stats, weapon } from "@src/core"
import { MillennialMovement } from "../families/millenial"

export const ElegyForTheEnd = weapon.Factory({
    Name: "ElegyForTheEnd",
    Type: stats.weapon.BOW,
    Stars: 5,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.ENERGY_RECHARGE,
    Effects: [
        effect.Factory({
            Name: "ElegyForTheEnd1",
            ApplySelf: true,
            MaxRank: 5,
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.ELEMENTAL_MASTERY).
                Values(60, 75, 90, 105, 120).
                Build(),
        }),
        MillennialMovement({
            Name: "ElegyForTheEnd2",
            OnApply: new effect.Builder().
                stat.
                Char(stats.stat.ELEMENTAL_MASTERY).
                Values(100, 125, 150, 175, 200).
                Next().
                stat.
                Char(stats.stat.ATK_PERCENT).
                Values(0.2, 0.25, 0.3, 0.35, 0.4).
                Build(),
        })
    ],
})