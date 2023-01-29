import { effect, scaling, stats, weapon } from "@src/core"

export const SerpentSpine = weapon.Factory({
    Name: "SerpentSpine",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "SerpentSpine1",
            MaxRank: 5,
            MaxStacks: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.06, 0.07, 0.08, 0.09, 0.10)
                .Stacks()
                .Build()
        })
    ]
})