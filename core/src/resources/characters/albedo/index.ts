import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c2, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Albedo = charbox.Factory({
    Name: "Albedo",
    Element: stats.stat.GEO_DMG,
    Stars: 5,
    Weapon: stats.weapon.SWORD,
    StatBonus: stats.stat.GEO_DMG,
    Region: stats.region.MONDSTADT,

    AtkBase: [19.551, 80.28111],
    DefBase: [68.2062, 280.098],
    HpBase: [1029.5856, 4228.035],

    BurstCost: 40,

    Normals,
    Skills,
    Bursts,
    Extra: [],

    Effects: [
        a1,
        a4,
        c2,
        c3,
        c4,
        c5,
        c6,
    ]
})