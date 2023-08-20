import { scaling, stats, weapon } from "@src/core"

export const RightfulReward = weapon.Factory({
    Name: "RightfulReward",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Substat: stats.stat.HP_PERCENT,
    Scaling: scaling.WeaponScaling.TYPE_44,

    Effects: []
})