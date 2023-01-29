import { scaling, stats, weapon } from "@src/core"

export const FavoniusLance = weapon.Factory({
    Name: "FavoniusLance",
    Type: stats.weapon.POLEARM,
    Stars: 4,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ENERGY_RECHARGE,
    Effects: []
})