import { scaling, stats, weapon } from "@src/core"
import { Royal } from "../families/royal"

export const RoyalBow = weapon.Factory({
    Name: "RoyalBow",
    Stars: 4,
    Type: stats.weapon.BOW,

    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        Royal("RoyalBow1")
    ]
})