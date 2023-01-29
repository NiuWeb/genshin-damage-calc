import { scaling, stats, weapon } from "@src/core"

export const SacrificialSword = weapon.Factory({
    Name: "SacrificialSword",
    Type: stats.weapon.SWORD,
    Stars: 4,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.ENERGY_RECHARGE,
    Effects: []
})