import { effect, scaling, stats, weapon } from "@src/core"

export const FlowingPurity = weapon.Factory({
    Name: "FlowingPurity",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Substat: stats.stat.ATK_PERCENT,
    Scaling: scaling.WeaponScaling.TYPE_44,

    Effects: [
        effect.Factory({
            Name: "FlowingPurity1",
            MaxRank: 5,
            MaxConditions: 1,
            MaxStacks: 6000,
            Conditions: ["CAST_SKILL"],
            OnApply: new effect.Builder()
                .Where({ effect: { conditions: ["CAST_SKILL"] } })
                .stat
                .Char(...stats.Elements.filter(x => x !== stats.stat.PHYSICAL_DMG))
                .Values(0.08, 0.1, 0.12, 0.14, 0.16)
                .Next()

                .stat
                .Char(...stats.Elements.filter(x => x !== stats.stat.PHYSICAL_DMG))
                .Values(...[0.02, 0.025, 0.03, 0.035, 0.04].map(x => x / 1000))
                .Stacks()
                .Build()
        })
    ]
})