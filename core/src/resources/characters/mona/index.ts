import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c1, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Mona = charbox.Factory({
    Name: "Mona",
    Stars: 5,
    Weapon: stats.weapon.CATALYST,
    Element: stats.stat.HYDRO_DMG,
    StatBonus: stats.stat.ENERGY_RECHARGE,
    Region: stats.region.MONDSTADT,
    BurstCost: 60,

    HpBase: [810.322, 3327.62],
    AtkBase: [22.344, 91.74984],
    DefBase: [50.8555, 208.845],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        qBonus,
        a1,
        a4,
        c1,
        c3,
        c4,
        c5,
        c6,
    ],
})		