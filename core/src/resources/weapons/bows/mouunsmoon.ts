import { scaling, stats, weapon } from "@src/core"
import { Wavewalker } from "../families/wavewalker"

export const MouunsMoon = weapon.Factory({
    Name: "MouunsMoon",
    Type: stats.weapon.BOW,
    Stars: 4,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        Wavewalker("MouunsMoon1")
    ]
})