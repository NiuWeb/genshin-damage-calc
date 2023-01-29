import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c2, c3, c4, c5 } from "./constellations"
import { Normals } from "./normals"
import { a4 } from "./passives"
import { Skills } from "./skills"

export const Yunjin = charbox.Factory({
    Name: "Yunjin",
    Stars: 4,
    Weapon: stats.weapon.POLEARM,
    Element: stats.stat.GEO_DMG,
    StatBonus: stats.stat.ENERGY_RECHARGE,
    Region: stats.region.LIYUE,
    BurstCost: 60,

    HpBase: [893.5552, 3197.1245],
    AtkBase: [16.0272, 57.34638],
    DefBase: [61.5741, 220.311],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        qBonus,
        a4,
        c2,
        c3,
        c4,
        c5,
    ],
})		