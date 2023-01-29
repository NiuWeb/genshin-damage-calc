import { scaling, stats, weapon } from "@src/core"

export const OtherworldlyStory = weapon.Factory({
    Name: "OtherworldlyStory",
    Stars: 3,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_39,
    Substat: stats.stat.ENERGY_RECHARGE,
    Effects: []
})