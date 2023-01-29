import { scaling, stats, weapon } from "@src/core"
import { GoldenMajesty } from "../families/goldenmajesty"

export const SummitShaper = weapon.Factory({
    Name: "SummitShaper",
    Stars: 5,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        GoldenMajesty("SummitShaper1")
    ]
})