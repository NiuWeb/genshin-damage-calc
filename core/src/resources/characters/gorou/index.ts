import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { eBonus, Skills } from "./skills"

export const Gorou = charbox.Factory({
    Name: "Gorou",
    Stars: 4,
    Weapon: stats.weapon.BOW,
    Element: stats.stat.GEO_DMG,
    StatBonus: stats.stat.GEO_DMG,
    BurstCost: 80,
    Region: stats.region.INAZUMA,

    HpBase: [802.3761, 2870.8872],
    AtkBase: [15.31488, 54.797653],
    DefBase: [54.36375, 194.5125],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        eBonus,
        a1,
        a4,
        c3,
        c5,
        c6,
    ],
})				