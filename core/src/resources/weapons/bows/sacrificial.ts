import { scaling, stats, weapon } from "@src/core"

export const SacrificialBow = weapon.Factory({
    Name: "SacrificialBow",
    Type: stats.weapon.BOW,
    Stars: 4,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ENERGY_RECHARGE,
    Effects: []
})