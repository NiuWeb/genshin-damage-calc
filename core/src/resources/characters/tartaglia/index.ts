import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c3, c5 } from "./constellations"
import { Normals } from "./normals"
import { a0 } from "./passives"
import { Skills } from "./skills"

export const Tartaglia = charbox.Factory({
    Name: "Tartaglia",
    Stars: 5,
    Weapon: stats.weapon.BOW,
    Element: stats.stat.HYDRO_DMG,
    StatBonus: stats.stat.HYDRO_DMG,
    Region: stats.region.SNEZHNAYA,
    BurstCost: 60,

    HpBase: [1020.0524, 4188.8867],
    AtkBase: [23.4612, 96.33733],
    DefBase: [63.4198, 260.442],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        a0,
        c3,
        c5,
    ],
})				