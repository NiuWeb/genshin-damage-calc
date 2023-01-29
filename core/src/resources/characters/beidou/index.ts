import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a4 } from "./passives"
import { eBonus, Skills } from "./skills"

export const Beidou = charbox.Factory({
    Name: "Beidou",
    Stars: 4,
    Weapon: stats.weapon.CLAYMORE,
    Element: stats.stat.ELECTRO_DMG,
    Region: stats.region.LIYUE,
    StatBonus: stats.stat.ELECTRO_DMG,

    AtkBase: [18.87648, 67.54129],
    DefBase: [54.36375, 194.5125],
    HpBase: [1094.1492, 3914.8462],

    BurstCost: 80,

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        eBonus,
        a4,
        c3,
        c4,
        c5,
        c6,
    ]
})