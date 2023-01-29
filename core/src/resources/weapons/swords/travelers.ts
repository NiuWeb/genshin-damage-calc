import { scaling, stats, weapon } from "@src/core"

export const TravelersHandySword = weapon.Factory({
    Name: "TravelersHandySword",
    Stars: 3,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_40,
    Substat: stats.stat.DEF_PERCENT,
    Effects: []
})