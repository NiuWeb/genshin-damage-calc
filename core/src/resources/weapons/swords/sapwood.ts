import { scaling, stats, weapon } from "@src/core"
import { ForestSanctuary } from "../families/forestsanctuary"

export const SapwoodBlade = weapon.Factory({
    Name: "SapwoodBlade",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ENERGY_RECHARGE,

    Effects: [
        ForestSanctuary("SapwoodBlade1")
    ]
})