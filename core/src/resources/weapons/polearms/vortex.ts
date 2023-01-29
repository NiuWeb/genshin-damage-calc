import { scaling, stats, weapon } from "@src/core"
import { GoldenMajesty } from "../families/goldenmajesty"

export const VortexVanquisher = weapon.Factory({
    Name: "VortexVanquisher",
    Stars: 5,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        GoldenMajesty("VortexVanquisher1")
    ]
})