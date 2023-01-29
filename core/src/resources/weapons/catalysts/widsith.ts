import { effect, scaling, stats, weapon } from "@src/core"

export const TheWidsith = weapon.Factory({
    Name: "TheWidsith",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        effect.Factory({
            Name: "TheWidsith1",
            MaxRank: 5,
            Conditions: ["RECITATIVE", "ARIA", "INTERLUDE"],
            MaxConditions: 1,
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["RECITATIVE"] } })
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.60, 0.75, 0.90, 1.05, 1.20)
                .Next()

                .Where({ effect: { conditions: ["ARIA"] } })
                .stat
                .Char(...stats.Elements.filter(s => s !== stats.stat.PHYSICAL_DMG))
                .Values(0.48, 0.60, 0.72, 0.84, 0.96)
                .Next()

                .Where({ effect: { conditions: ["INTERLUDE"] } })
                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Values(240, 300, 360, 420, 480)

                .Build()
        })
    ]
})