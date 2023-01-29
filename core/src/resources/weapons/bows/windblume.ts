import { effect, scaling, stats, weapon } from "@src/core"

export const WindblumeOde = weapon.Factory({
    Name: "WindblumeOde",
    Stars: 4,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ELEMENTAL_MASTERY,
    Effects: [
        effect.Factory({
            Name: "WindblumeOde1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.16, 0.20, 0.24, 0.28, 0.32)
                .Build()
        })
    ]
})