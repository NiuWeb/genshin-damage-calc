import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c2, c3, c5 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Cyno = charbox.Factory({
    Name: "Cyno",
    Stars: 5,
    Weapon: stats.weapon.POLEARM,
    Element: stats.stat.ELECTRO_DMG,
    StatBonus: stats.stat.CRIT_DMG,
    BurstCost: 80,
    Region: stats.region.SUMERU,

    HpBase: [972.3864, 3993.1443],
    AtkBase: [24.7646, 101.68941],
    DefBase: [66.88994, 274.6926],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        qBonus,
        a1,
        a4,
        c2,
        c3,
        c5,
    ],
})				