import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c2, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Fischl = charbox.Factory({
    Name: "Fischl",
    Stars: 4,
    Element: stats.stat.ELECTRO_DMG,
    Region: stats.region.MONDSTADT,
    Weapon: stats.weapon.BOW,
    StatBonus: stats.stat.ATK_PERCENT,

    AtkBase: [20.4792, 73.27593],
    HpBase: [770.4634, 2756.704],
    DefBase: [49.78575, 178.1325],

    BurstCost: 60,

    Normals,
    Skills,
    Bursts,
    Extra: [],

    Effects: [
        a1,
        a4,
        c1,
        c2,
        c3,
        c4,
        c5,
        c6
    ],
})		