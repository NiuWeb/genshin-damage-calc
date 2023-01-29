import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c2, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { Skills } from "./skills"

export const Noelle = charbox.Factory({
    Name: "Noelle",
    Stars: 4,
    Element: stats.stat.GEO_DMG,
    StatBonus: stats.stat.DEF_PERCENT,
    BurstCost: 60,
    Region: stats.region.MONDSTADT,
    Weapon: stats.weapon.CLAYMORE,

    HpBase: [1012.088, 3621.2327],
    AtkBase: [16.0272, 57.34638],
    DefBase: [66.95325, 239.5575],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        qBonus,
        c2,
        c3,
        c4,
        c5,
        c6,
    ],
})		