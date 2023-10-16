import { charbox, stats } from "@src/core"
import { Normals } from "./normals"
import { Skills } from "./skills"
import { Bursts } from "./bursts"
import { a1, a4 } from "./passives"
import { c2, c3, c5 } from "./constellations"

export const Neuvillette = charbox.Factory({
    Name: "Neuvillette",
    Stars: 5,
    Element: stats.stat.HYDRO_DMG,
    Weapon: stats.weapon.CATALYST,
    StatBonus: stats.stat.CRIT_DMG,
    BurstCost: 70,
    Region: stats.region.FONTAINE,
    HpBase: [1143.984, 4697.8169],
    AtkBase: [16.218, 66.595],
    DefBase: [44.8725, 184.275],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        a1,
        a4,
        c2,
        c3,
        c5,
    ],
})