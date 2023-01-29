import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c2, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4, sprint } from "./passives"
import { Skills } from "./skills"

export const Ayaka = charbox.Factory({
    Name: "Ayaka",
    Stars: 5,
    Element: stats.stat.CRYO_DMG,
    StatBonus: stats.stat.CRIT_DMG,
    Weapon: stats.weapon.SWORD,
    Region: stats.region.INAZUMA,
    BurstCost: 80,

    HpBase: [1000.986, 4110.59],
    AtkBase: [26.6266, 109.33523],
    DefBase: [61.0266, 250.614],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        sprint,
        a1,
        a4,
        c2,
        c3,
        c4,
        c5,
        c6
    ],
})
