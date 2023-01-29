import { scaling, stats, weapon } from "@src/core"

export const RecurveBow = weapon.Factory({
    Name: "RecurveBow",
    Stars: 3,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_38,
    Substat: stats.stat.HP_PERCENT,

    Effects: []
})