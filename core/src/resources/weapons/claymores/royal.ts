import { scaling, stats, weapon } from "@src/core"
import { Royal } from "../families/royal"

export const RoyalGreatsword = weapon.Factory({
    Name: "RoyalGreatsword",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        Royal("RoyalGreatsword1")
    ]
})