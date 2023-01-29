import { scaling, stats, weapon } from "@src/core"

export const SacrificialFragments = weapon.Factory({
    Name: "SacrificialFragments",
    Type: stats.weapon.CATALYST,
    Stars: 4,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: []
})