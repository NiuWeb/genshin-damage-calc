import { scaling, stats, weapon } from "@src/core"
import { Royal } from "../families/royal"

export const RoyalSpear = weapon.Factory({
    Name: "RoyalSpear",
    Stars: 4,
    Type: stats.weapon.POLEARM,

    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        Royal("RoyalSpear1")
    ]
})