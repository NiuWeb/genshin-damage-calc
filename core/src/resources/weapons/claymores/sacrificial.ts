import { scaling, stats, weapon } from "@src/core"

export const SacrificialGreatsword = weapon.Factory({
    Name: "SacrificialGreatsword",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: []
})