import { scaling, stats, weapon } from "@src/core"
import { GoldenMajesty } from "../families/goldenmajesty"

export const TheUnforged = weapon.Factory({
    Name: "TheUnforged",
    Type: stats.weapon.CLAYMORE,
    Stars: 5,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        GoldenMajesty("TheUnforged1")
    ]
})