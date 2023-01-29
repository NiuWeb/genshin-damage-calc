import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c2, c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { eBonus } from "./skills"

export const Yoimiya = charbox.Factory({
    Name: "Yoimiya",
    Stars: 5,
    Weapon: stats.weapon.BOW,
    Element: stats.stat.PYRO_DMG,
    StatBonus: stats.stat.CRIT_RATE,
    Region: stats.region.INAZUMA,
    BurstCost: 60,

    HpBase: [791.2556, 3249.3232],
    AtkBase: [25.137, 103.21857],
    DefBase: [47.864, 196.56],

    Normals,
    Skills: [],
    Bursts,
    Extra: [],
    Effects: [
        eBonus,
        a1,
        a4,
        c1,
        c2,
        c3,
        c5,
        c6,
    ],
})		