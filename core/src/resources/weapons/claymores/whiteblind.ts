import { effect, scaling, stats, weapon } from "@src/core"

export const Whiteblind = weapon.Factory({
    Name: "Whiteblind",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.DEF_PERCENT,

    Effects: [
        effect.Factory({
            Name: "Whiteblind1",
            MaxRank: 5,
            MaxStacks: 4,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT, stats.stat.DEF_PERCENT)
                .Values(0.06, 0.075, 0.09, 0.105, 0.12)
                .Stacks()
                .Build()
        })
    ]
})