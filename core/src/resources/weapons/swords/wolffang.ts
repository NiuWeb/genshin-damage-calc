import { effect, scaling, stats, weapon } from "@src/core"

export const WolfFang = weapon.Factory({
    Name: "WolfFang",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Substat: stats.stat.CRIT_RATE,
    Scaling: scaling.WeaponScaling.TYPE_42,

    Effects: [
        effect.Factory({
            Name: "WolfFang1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG, stats.stat.ELEMENTAL_BURST_DMG)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Build()
        }),
        effect.Factory({
            Name: "WolfFang2",
            MaxRank: 5,
            MaxStacks: 4,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_CRIT_RATE)
                .Values(0.02, 0.025, 0.03, 0.035, 0.04)
                .Stacks()
                .Build()
        }),
        effect.Factory({
            Name: "WolfFang3",
            MaxRank: 5,
            MaxStacks: 4,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ELEMENTAL_BURST_CRIT_RATE)
                .Values(0.02, 0.025, 0.03, 0.035, 0.04)
                .Stacks()
                .Build()
        }),
    ]
})