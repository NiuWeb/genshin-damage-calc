import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c1, c2, c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { eBonus, Skills } from "./skills"

export const Ayato = charbox.Factory({
    Name: "Ayato",
    Stars: 5,
    Weapon: stats.weapon.SWORD,
    Element: stats.stat.HYDRO_DMG,
    StatBonus: stats.stat.CRIT_DMG,
    Region: stats.region.INAZUMA,
    BurstCost: 80,

    HpBase: [1067.7184, 4384.629],
    AtkBase: [23.275, 95.57275],
    DefBase: [59.83, 245.7],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        eBonus,
        qBonus,
        c1,
        c2,
        c3,
        c5,
        c6,
    ],
})				