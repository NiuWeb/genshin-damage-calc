import { charbox, stats } from "@src/core"
import { qBonus } from "./bursts"
import { c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a4 } from "./passives"
import { Skills } from "./skills"

export const Itto = charbox.Factory({
    Name: "Itto",
    Stars: 5,
    Weapon: stats.weapon.CLAYMORE,
    Element: stats.stat.GEO_DMG,
    StatBonus: stats.stat.CRIT_RATE,
    Region: stats.region.INAZUMA,
    BurstCost: 70,

    HpBase: [1000.986, 4110.59],
    AtkBase: [17.689, 72.63529],
    DefBase: [74.66784, 306.6336],

    Normals,
    Skills,
    Bursts: [],
    Extra: [],
    Effects: [
        qBonus,
        a4,
        c3,
        c4,
        c5,
        c6,
    ],
})