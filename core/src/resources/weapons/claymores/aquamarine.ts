import { scaling, stats, weapon } from "@src/core"
import { DesertPavilion } from "../families/desertpavilion"

export const MakhairaAquamarine = weapon.Factory({
    Name: "MakhairaAquamarine",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ELEMENTAL_MASTERY,

    Effects: [
        DesertPavilion("MakhairaAquamarine1", stats.stat.ATK_FLAT, [0.24, 0.30, 0.36, 0.42, 0.48])
    ]
})