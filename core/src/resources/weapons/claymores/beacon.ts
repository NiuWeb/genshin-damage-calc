import { effect, scaling, stats, weapon } from "@src/core"

export const BeaconOfTheReedSea = weapon.Factory({
    Name: "BeaconOfTheReedSea",
    Stars: 5,
    Type: stats.weapon.CLAYMORE,
    Substat: stats.stat.CRIT_RATE,
    Scaling: scaling.WeaponScaling.TYPE_46,

    Effects: [
        effect.Factory({
            Name: "BeaconOfTheReedSea1",
            MaxRank: 5,
            Conditions: ["HIT_SKILL", "DMG_TAKEN"],
            MaxConditions: 2,
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["HIT_SKILL"] } })
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Next()

                .Where({ effect: { conditions: ["DMG_TAKEN"] } })
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Next()

                .Where({ target: { shielded: false } })
                .stat
                .Char(stats.stat.HP_PERCENT)
                .Values(0.32, 0.4, 0.48, 0.56, 0.64)
                .Build()
        })
    ]
})