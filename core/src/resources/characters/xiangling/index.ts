import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c2, c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a4 } from "./passives"
import { Skills } from "./skills"

export const Xiangling = charbox.Factory({
    Name: "Xiangling",
    Stars: 4,
    Element: stats.stat.PYRO_DMG,
    StatBonus: stats.stat.ELEMENTAL_MASTERY,
    Weapon: stats.weapon.POLEARM,
    Region: stats.region.LIYUE,
    BurstCost: 80,

    HpBase: [911.791, 3262.3718],
    AtkBase: [18.87648, 67.54129],
    DefBase: [56.0805, 200.655],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        a4,
        c1,
        c2,
        c3,
        c5,
        c6,
    ],
})