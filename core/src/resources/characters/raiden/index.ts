import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c2, c3, c4, c5 } from "./constellations"
import { Normals } from "./normals"
import { a4 } from "./passives"
import { eBonus, Skills } from "./skills"

export const Raiden = charbox.Factory({
    Name: "Raiden",
    Stars: 5,
    Weapon: stats.weapon.POLEARM,
    Region: stats.region.INAZUMA,
    Element: stats.stat.ELECTRO_DMG,
    StatBonus: stats.stat.ENERGY_RECHARGE,
    BurstCost: 90,

    AtkBase: [26.2542, 107.80606],
    DefBase: [61.44541, 252.3339],
    HpBase: [1004.79926, 4126.249],

    Normals,
    Skills,
    Bursts,
    Extra: [],

    Effects: [
        eBonus,
        qBonus,
        a4,
        c2,
        c3,
        c4,
        c5,
    ],
})				