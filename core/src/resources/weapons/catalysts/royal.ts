import { scaling, stats, weapon } from "@src/core"
import { Royal } from "../families/royal"

export const RoyalGrimoire = weapon.Factory({
    Name: "RoyalGrimoire",
    Type: stats.weapon.CATALYST,
    Stars: 4,

    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        Royal("RoyalGrimoire1")
    ]
})