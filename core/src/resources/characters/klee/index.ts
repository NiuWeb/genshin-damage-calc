import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c2, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1 } from "./passives"
import { Skills } from "./skills"

export const Klee = charbox.Factory({
    Name: "Klee",
    Stars: 5,
    Weapon: stats.weapon.CATALYST,
    Element: stats.stat.PYRO_DMG,
    StatBonus: stats.stat.PYRO_DMG,
    Region: stats.region.MONDSTADT,
    BurstCost: 60,

    HpBase: [800.7888, 3288.4717],
    AtkBase: [24.206, 99.39566],
    DefBase: [47.864, 196.56],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        a1,
        c1,
        c2,
        c3,
        c4,
        c5,
        c6,
    ],
})