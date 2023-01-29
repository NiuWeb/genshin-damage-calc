import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c1, c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Kokomi = charbox.Factory({
    Name: "Kokomi",
    Stars: 5,
    Weapon: stats.weapon.CATALYST,
    Element: stats.stat.HYDRO_DMG,
    StatBonus: stats.stat.HYDRO_DMG,
    Region: stats.region.INAZUMA,
    BurstCost: 70,

    HpBase: [1048.652, 4306.332],
    AtkBase: [18.2476, 74.92904],
    DefBase: [51.15465, 210.0735],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        qBonus,
        a1,
        a4,
        c1,
        c3,
        c5,
        c6,
    ],
})				