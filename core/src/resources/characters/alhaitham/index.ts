import { charbox, stats } from "@src/core"
import { a4 } from "./passives"
import { Bursts } from "./bursts"
import { Normals } from "./normals"
import { eBonus, Skills } from "./skills"
import { c2, c3, c4, c5, c6 } from "./constellations"

export const Alhaitham = charbox.Factory({
    Name: "Alhaitham",
    Stars: 5,
    Weapon: stats.weapon.SWORD,
    Element: stats.stat.DENDRO_DMG,
    StatBonus: stats.stat.DENDRO_DMG,
    Region: stats.region.SUMERU,
    BurstCost: 70,

    AtkBase: [24.3922, 100.16024],
    DefBase: [60.84711, 249.8769],
    HpBase: [1039.1188, 4267.1836],

    Normals,
    Skills,
    Bursts,
    Extra: [],

    Effects: [
        eBonus,
        a4,
        c2,
        c3,
        c4,
        c5,
        c6,
    ]
})				