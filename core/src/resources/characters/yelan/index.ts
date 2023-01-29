import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c2, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Yelan = charbox.Factory({
    Name: "Yelan",
    Stars: 5,
    Element: stats.stat.HYDRO_DMG,
    Weapon: stats.weapon.BOW,
    Region: stats.region.LIYUE,
    BurstCost: 70,
    HpBase: [1124.9176, 4619.52,],
    AtkBase: [18.9924, 77.987366,],
    DefBase: [42.65879, 175.1841,],
    StatBonus: stats.stat.CRIT_RATE,
    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        a1, a4,
        c2, c3, c4, c5, c6
    ],
})