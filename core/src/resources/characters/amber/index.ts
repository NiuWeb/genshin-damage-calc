import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c2, c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Amber = charbox.Factory({
    Name: "Amber",
    Stars: 4,
    Weapon: stats.weapon.BOW,
    Element: stats.stat.PYRO_DMG,
    StatBonus: stats.stat.ATK_PERCENT,
    BurstCost: 40,
    Region: stats.region.MONDSTADT,
    HpBase: [793.2582, 2838.2634],
    AtkBase: [18.6984, 66.90411],
    DefBase: [50.358, 180.18],

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
        c5,
        c6,
    ],
})		