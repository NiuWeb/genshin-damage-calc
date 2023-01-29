import { scaling, stats, weapon } from "@src/core"

export const FavoniusCodex = weapon.Factory({
    Name: "FavoniusCodex",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: []
})