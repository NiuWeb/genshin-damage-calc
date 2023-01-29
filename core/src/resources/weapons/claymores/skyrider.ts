import { effect, scaling, stats, weapon } from "@src/core"

export const SkyriderGreatsword = weapon.Factory({
    Name: "SkyriderGreatsword",
    Type: stats.weapon.CLAYMORE,
    Stars: 3,
    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.PHYSICAL_DMG,

    Effects: [
        effect.Factory({
            Name: "SkyriderGreatsword1",
            MaxRank: 5,
            MaxStacks: 4,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.06, 0.07, 0.08, 0.09, 0.10)
                .Build()
        })
    ]
})