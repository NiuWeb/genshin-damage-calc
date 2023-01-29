import { scaling, stats, weapon } from "@src/core"
import { Royal } from "../families/royal"

export const RoyalLongsword = weapon.Factory({
    Name: "RoyalLongsword",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        Royal("RoyalLongsword1")
    ]
})