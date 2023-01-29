import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Keqing = charbox.Factory({
    Name: "Keqing",
    Stars: 5,
    Element: stats.stat.ELECTRO_DMG,
    StatBonus: stats.stat.CRIT_DMG,
    Weapon: stats.weapon.SWORD,
    Region: stats.region.LIYUE,
    BurstCost: 40,

    HpBase: [1020.0524, 4188.8867],
    AtkBase: [25.137, 103.21857],
    DefBase: [62.2232, 255.528],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        a1,
        a4,
        c1,
        c3,
        c4,
        c5,
        c6,
    ],
})				