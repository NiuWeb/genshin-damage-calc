import { charbox, stats } from "@src/core"
import { a1, a4 } from "./passives"
import { Bursts, qBonus } from "./bursts"
import { Normals } from "./normals"
import { eBonus, Skills } from "./skills"
import { c2, c3, c4, c5 } from "./constellations"

export const Shenhe = charbox.Factory({
    Name: "Shenhe",
    Stars: 5,
    Element: stats.stat.CRYO_DMG,
    Weapon: stats.weapon.POLEARM,
    StatBonus: stats.stat.ATK_PERCENT,
    Region: stats.region.LIYUE,
    BurstCost: 80,

    HpBase: [1011.47253, 4153.653],
    AtkBase: [23.6474, 97.10191],
    DefBase: [64.6164, 265.356],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        eBonus,
        qBonus,
        a1,
        a4,
        c2,
        c3,
        c4,
        c5,
    ],
})		