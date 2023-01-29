import { charbox, stats } from "@src/core"
import { Normals } from "./normals"
import { a1 } from "./a1"
import { Skills } from "./skills"
import { a4 } from "./a4"
import { qBonus } from "./bursts"
import { c1, c2, c3, c4, c5, c6 } from "./constellations"

export const Nahida = charbox.Factory({
    Name: "Nahida",
    Stars: 5,
    Element: stats.stat.DENDRO_DMG,
    Region: stats.region.SUMERU,
    Weapon: stats.weapon.CATALYST,
    StatBonus: stats.stat.ELEMENTAL_MASTERY,
    BurstCost: 50,

    HpBase: [806.5087, 3311.961],
    AtkBase: [23.275, 95.57275],
    DefBase: [49.0606, 201.474],

    Normals,
    Skills,
    Bursts: [],
    Extra: [],
    Effects: [
        qBonus,
        a1,
        a4,
        c1,
        c2,
        c3,
        c4,
        c5,
        c6,
    ],
})