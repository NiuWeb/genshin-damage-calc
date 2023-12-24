import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c2, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { eBonus, eBonus2, Skills } from "./skills"

export const Navia = charbox.Factory({
    Name: "Navia",
    Element: stats.stat.GEO_DMG,
    Stars: 5,
    Weapon: stats.weapon.CLAYMORE,
    StatBonus: stats.stat.CRIT_DMG,
    BurstCost: 60,
    Region: stats.region.FONTAINE,
    HpBase: [984.78, 4044.0373535156],
    AtkBase: [27.3714, 112.3935546875],
    DefBase: [61.74456, 253.56239318848],
    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        eBonus, 
        eBonus2, 
        a1, 
        a4,
        c2,
        c3,
        c4,
        c5,
        c6
    ],
})		