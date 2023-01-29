import { scaling, stats, weapon } from "@src/core"

export const WhiteIronGreatsword = weapon.Factory({
    Name: "WhiteIronGreatsword",
    Stars: 3,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.DEF_PERCENT,

    Effects: []
})