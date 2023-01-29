import { scaling, stats, weapon } from "@src/core"

export const FavoniusWarbow = weapon.Factory({
    Name: "FavoniusWarbow",
    Type: stats.weapon.BOW,
    Stars: 4,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.ENERGY_RECHARGE,
    Effects: []
})