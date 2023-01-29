import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Rosaria = charbox.Factory({
    Name: "Rosaria",
    Stars: 4,
    Weapon: stats.weapon.POLEARM,
    Element: stats.stat.CRYO_DMG,
    Region: stats.region.MONDSTADT,
    StatBonus: stats.stat.ATK_PERCENT,
    BurstCost: 60,

    HpBase: [1030.3239, 3686.4802],
    AtkBase: [20.12304, 72.001564],
    DefBase: [59.514, 212.94],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        a1,
        a4,
        c1,
        c3,
        c5,
        c6,
    ],
})		