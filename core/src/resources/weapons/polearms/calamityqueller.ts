import { effect, scaling, stats, weapon } from "@src/core"

export const CalamityQueller = weapon.Factory({
    Name: "CalamityQueller",
    Stars: 5,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_49,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        effect.Factory({
            Name: "CalamityQueller1",
            MaxRank: 5,
            MaxStacks: 6,
            Conditions: ["ON_FIELD", "OFF_FIELD"],
            MaxConditions: 1,
            OnApply: new effect.Builder()
                .stat
                .Char(...stats.Elements.filter(s => s !== stats.stat.PHYSICAL_DMG))
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()

                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.032, 0.04, 0.048, 0.056, 0.064)
                .Stacks()
                .Next()

                .Where({ effect: { conditions: ["OFF_FIELD"] } })
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.032, 0.04, 0.048, 0.056, 0.064)
                .Stacks()
                .Next()
                .Build()
        })
    ]
})