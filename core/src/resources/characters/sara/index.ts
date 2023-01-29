import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c2, c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { eBonus, Skills } from "./skills"

export const Sara = charbox.Factory({
    Name: "Sara",
    Stars: 4,
    Weapon: stats.weapon.BOW,
    Region: stats.region.INAZUMA,
    Element: stats.stat.ELECTRO_DMG,
    BurstCost: 80,

    HpBase: [802.3761, 2870.8872],
    AtkBase: [16.38336, 58.620743],
    DefBase: [52.647, 188.37],
    StatBonus: stats.stat.ATK_PERCENT,

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        eBonus, c2, c3, c5, c6,
    ],
})