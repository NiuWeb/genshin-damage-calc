import { scaling, stats, weapon } from "@src/core"
import { DesertPavilion } from "../families/desertpavilion"

export const XiphosMoonlight = weapon.Factory({
    Name: "XiphosMoonlight",
    Type: stats.weapon.SWORD,
    Stars: 4,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        DesertPavilion("XiphosMoonlight1", stats.stat.ENERGY_RECHARGE, [
            0.036 / 100,
            0.045 / 100,
            0.054 / 100,
            0.063 / 100,
            0.072 / 100
        ])
    ]
})