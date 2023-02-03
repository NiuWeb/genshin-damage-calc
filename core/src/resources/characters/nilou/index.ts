import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c2, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Nilou = charbox.Factory({
    Name: "Nilou",
    Stars: 5,
    Element: stats.stat.HYDRO_DMG,
    Weapon: stats.weapon.SWORD,
    StatBonus: stats.stat.HP_PERCENT,
    Region: stats.region.SUMERU,
    BurstCost: 70,

    HpBase: [1182.1168, 4854.4106],
    AtkBase: [17.8752, 73.39987],
    DefBase: [56.71884, 232.9236],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        a1,
        a4,
        c1,
        c2,
        c3,
        c4,
        c5,
        c6,
    ]
})				