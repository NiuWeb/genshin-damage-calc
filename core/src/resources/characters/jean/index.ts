import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { Normals } from "./normals"
import { c1, c3, c4, c5 } from "./constellations"
import { Skills } from "./skills"

export const Jean = charbox.Factory({
    Name: "Jean",
    Stars: 5,
    Element: stats.stat.ANEMO_DMG,
    StatBonus: stats.stat.HEALING_BONUS,
    Weapon: stats.weapon.SWORD,
    Region: stats.region.MONDSTADT,
    BurstCost: 80,

    HpBase: [1143.984, 4697.817],
    AtkBase: [18.62, 76.4582],
    DefBase: [59.83, 245.7],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        c1,
        c3,
        c4,
        c5,
    ],
})				