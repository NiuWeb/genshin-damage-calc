import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c1, c2, c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { Skills } from "./skills"

export const Bennett = charbox.Factory({
    Name: "Bennett",
    Stars: 4,
    Weapon: stats.weapon.SWORD,
    Element: stats.stat.PYRO_DMG,
    Region: stats.region.MONDSTADT,
    StatBonus: stats.stat.ENERGY_RECHARGE,
    BurstCost: 60,

    HpBase: [1039.4418, 3719.104],
    AtkBase: [16.0272, 57.34638],
    DefBase: [64.66425, 231.3675],

    Normals,
    Skills,
    Bursts,
    Effects: [
        qBonus,
        c1,
        c2,
        c3,
        c5,
        c6,
    ],
    Extra: [],
})