import { effect, scaling, stats, weapon } from "@src/core"

export const Veredict = weapon.Factory({
    Name: "Veredict",
    Stars: 5,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_48,
    Substat: stats.stat.CRIT_RATE,

    Effects: [
        effect.Factory({
            Name: "Veredict1",
            MaxStacks: 2,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Next()

                .stat
                .Char(stats.stat.ELEMENTAL_SKILL_DMG)
                .Values(0.18, 0.225, 0.27, 0.315, 0.36)
                .Stacks()
                .Build(),
        })
    ]
})