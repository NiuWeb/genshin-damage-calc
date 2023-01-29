import { scaling, stats, weapon } from "@src/core"
import { ForestSanctuary } from "../families/forestsanctuary"

export const ForestRegalia = weapon.Factory({
    Name: "ForestRegalia",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        ForestSanctuary("ForestRegalia1")
    ]
})