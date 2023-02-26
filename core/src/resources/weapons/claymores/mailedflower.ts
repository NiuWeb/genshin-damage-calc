import { effect, scaling, stats, weapon } from "@src/core"

export const MailedFlower = weapon.Factory({
    Name: "MailedFlower",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Substat: stats.stat.ELEMENTAL_MASTERY,
    Scaling: scaling.WeaponScaling.TYPE_44,

    Effects: [
        effect.Factory({
            Name: "MailedFlower1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Next()
                .stat
                .Char(stats.stat.ELEMENTAL_MASTERY)
                .Values(48, 60, 72, 84, 96)
                .Build()
        })
    ]
})