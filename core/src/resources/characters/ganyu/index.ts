import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c3, c4, c5 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Ganyu = charbox.Factory({
    Name: "Ganyu",
    Stars: 5,
    Weapon: stats.weapon.BOW,
    Region: stats.region.LIYUE,
    Element: stats.stat.CRYO_DMG,
    StatBonus: stats.stat.CRIT_DMG,
    BurstCost: 60,

    HpBase: [762.656, 3131.878],
    AtkBase: [26.068, 107.04148],
    DefBase: [49.0606, 201.474],

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
    ],
})				