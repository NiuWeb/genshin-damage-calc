import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c2, c3, c5 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { eBonus, Skills } from "./skills"

export const Wanderer = charbox.Factory({
    Name: "Wanderer",
    Stars: 5,
    Weapon: stats.weapon.CATALYST,
    Element: stats.stat.ANEMO_DMG,
    StatBonus: stats.stat.CRIT_RATE,
    Region: stats.region.SUMERU,
    BurstCost: 60,

    HpBase: [791.2556, 3249.3232],
    AtkBase: [25.5094, 104.747734],
    DefBase: [47.2657, 194.103],

    Normals,
    Skills,
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
    ],
})				