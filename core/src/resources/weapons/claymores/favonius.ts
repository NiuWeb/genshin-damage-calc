import { scaling, stats, weapon } from "@src/core"

export const FavoniusGreatsword = weapon.Factory({
    Name: "FavoniusGreatsword",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: []
})