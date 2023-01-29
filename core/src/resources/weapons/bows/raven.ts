import { effect, scaling, stats, weapon } from "@src/core"

export const RavenBow = weapon.Factory({
    Name: "RavenBow",
    Stars: 3,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_40,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        effect.Factory({
            Name: "RavenBow1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .Where({ enemy: { affected: [stats.stat.PYRO_DMG, stats.stat.ELECTRO_DMG] } })
                .stat
                .Char(stats.stat.ALL_DMG)
                .Values(0.12, 0.15, 0.18, 0.21, 0.24)
                .Build()
        })
    ]
})