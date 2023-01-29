import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c2, c3, c5 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { seals } from "./seals"
import { Skills } from "./skills"

export const Yanfei = charbox.Factory({
    Name: "Yanfei",
    Stars: 4,
    Element: stats.stat.PYRO_DMG,
    StatBonus: stats.stat.PYRO_DMG,
    Weapon: stats.weapon.CATALYST,
    Region: stats.region.LIYUE,
    BurstCost: 80,

    HpBase: [784.14026, 2805.64],
    AtkBase: [20.12304, 72.001564],
    DefBase: [49.2135, 176.085],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        seals,
        qBonus,
        a1,
        a4,
        c2,
        c3,
        c5,
    ],
})