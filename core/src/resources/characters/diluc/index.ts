import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c1, c2, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a4 } from "./passives"
import { Skills } from "./skills"

export const Diluc = charbox.Factory({
    Name: "Diluc",
    Stars: 5,
    Weapon: stats.weapon.CLAYMORE,
    Element: stats.stat.PYRO_DMG,
    StatBonus: stats.stat.CRIT_RATE,
    BurstCost: 40,
    Region: stats.region.MONDSTADT,

    HpBase: [1010.5192, 4149.7383],
    AtkBase: [26.068, 107.04148],
    DefBase: [61.0266, 250.614],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        qBonus,
        a4,
        c1,
        c2,
        c3,
        c4,
        c5,
        c6,
    ],
})				