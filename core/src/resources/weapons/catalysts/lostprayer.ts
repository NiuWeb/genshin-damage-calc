import { effect, scaling, stats, weapon } from "@src/core"

export const LostPrayer = weapon.Factory({
    Name: "LostPrayer",
    Stars: 5,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_48,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "LostPrayer1",
            MaxRank: 5,
            MaxStacks: 4,
            OnApply: new effect.Builder()
                .stat
                .Char(...stats.Elements.filter(s => s !== stats.stat.PHYSICAL_DMG))
                .Values(0.08, 0.10, 0.12, 0.14, 0.16)
                .Stacks()
                .Build()
        })
    ]
})