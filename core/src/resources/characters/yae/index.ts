import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a4 } from "./passives"
import { Skills } from "./skills"

export const Yae = charbox.Factory({
    Name: "Yae",
    Stars: 5,
    Element: stats.stat.ELECTRO_DMG,
    StatBonus: stats.stat.CRIT_RATE,
    Weapon: stats.weapon.CATALYST,
    Region: stats.region.INAZUMA,
    BurstCost: 90,

    HpBase: [807.46204, 3315.8757],
    AtkBase: [26.4404, 108.57064],
    DefBase: [44.2742, 181.818],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        a4,
        c3,
        c4,
        c5,
        c6,
    ],
})			