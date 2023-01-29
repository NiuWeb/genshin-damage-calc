import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c3, c5 } from "./constellations"
import { Normals } from "./normals"
import { a4 } from "./passives"
import { Skills } from "./skills"

export const Ningguang = charbox.Factory({
    Name: "Ningguang",
    Stars: 4,
    Element: stats.stat.GEO_DMG,
    StatBonus: stats.stat.GEO_DMG,
    Weapon: stats.weapon.CATALYST,
    Region: stats.region.LIYUE,
    BurstCost: 40,

    HpBase: [820.6119, 2936.1348],
    AtkBase: [17.808, 63.7182],
    DefBase: [48.069, 171.99],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        a4,
        c3,
        c5,
    ],
})		