import { scaling, stats, weapon } from "@src/core"
import { Lithic } from "../families/lithic"

export const LithicSpear = weapon.Factory({
    Name: "LithicSpear",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        Lithic("LithicSpear1")
    ]
})