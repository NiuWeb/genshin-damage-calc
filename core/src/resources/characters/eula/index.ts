import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c1, c3, c4, c5 } from "./constellations"
import { Normals } from "./normals"
import { a1 } from "./passives"
import { eBonus1, eBonus2, Skills } from "./skills"

export const Eula = charbox.Factory({
    Name: "Eula",
    Stars: 5,
    Weapon: stats.weapon.CLAYMORE,
    Element: stats.stat.CRYO_DMG,
    StatBonus: stats.stat.CRIT_DMG,
    BurstCost: 80,
    Region: stats.region.MONDSTADT,

    HpBase: [1029.5856, 4228.035],
    AtkBase: [26.6266, 109.33523],
    DefBase: [58.45391, 240.0489],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        eBonus1,
        eBonus2,
        qBonus,
        a1,
        c1,
        c3,
        c4,
        c5,
    ],
})