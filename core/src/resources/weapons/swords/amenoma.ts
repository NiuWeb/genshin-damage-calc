import { scaling, stats, weapon } from "@src/core"

export const AmenomaKageuchi = weapon.Factory({
    Name: "AmenomaKageuchi",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.ATK_PERCENT,

    Effects: []
})