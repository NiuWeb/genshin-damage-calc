import { charbox, stats } from "@src/core"
import { Bursts, qAbsorb } from "./bursts"
import { c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Sucrose = charbox.Factory({
    Name: "Sucrose",
    Stars: 4,
    Element: stats.stat.ANEMO_DMG,
    StatBonus: stats.stat.ANEMO_DMG,
    Weapon: stats.weapon.CATALYST,
    Region: stats.region.MONDSTADT,
    BurstCost: 80,

    HpBase: [775.02234, 2773.016],
    AtkBase: [14.2464, 50.97456],
    DefBase: [58.94175, 210.8925],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        qAbsorb,
        a1,
        a4,
        c3,
        c5,
        c6,
    ],
})				