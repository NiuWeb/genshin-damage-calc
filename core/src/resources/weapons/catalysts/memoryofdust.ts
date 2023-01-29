import { scaling, stats, weapon } from "@src/core"
import { GoldenMajesty } from "../families/goldenmajesty"

export const MemoryOfDust = weapon.Factory({
    Name: "MemoryOfDust",
    Stars: 5,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_46,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        GoldenMajesty("MemoryOfDust1")
    ]
})