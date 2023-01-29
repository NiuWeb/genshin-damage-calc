import { scaling, stats, weapon } from "@src/core"
import { Lithic } from "../families/lithic"

export const LithicBlade = weapon.Factory({
    Name: "LithicBlade",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        Lithic("LithicBlade1")
    ]
})