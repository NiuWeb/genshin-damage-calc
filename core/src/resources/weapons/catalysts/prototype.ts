import { scaling, stats, weapon } from "@src/core"

export const PrototypeAmber = weapon.Factory({
    Name: "PrototypeAmber",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.HP_PERCENT,

    Effects: []
})