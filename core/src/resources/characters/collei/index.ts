import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1 } from "./passives"
import { Skills } from "./skills"

export const Collei = charbox.Factory({
    Name: "Collei",
    Stars: 4,
    Weapon: stats.weapon.BOW,
    Element: stats.stat.DENDRO_DMG,
    StatBonus: stats.stat.ATK_PERCENT,
    BurstCost: 60,
    Region: stats.region.SUMERU,

    HpBase: [820.6119, 2936.1348],
    AtkBase: [16.73952, 59.895107],
    DefBase: [50.358, 180.18],

    Normals,
    Skills,
    Bursts,
    Extra: [],

    Effects: [
        a1,
        c1,
        c3,
        c4,
        c5,
        c6
    ],
})