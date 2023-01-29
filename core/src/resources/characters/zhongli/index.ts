import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c3, c5 } from "./constellations"
import { Normals } from "./normals"
import { a4 } from "./passives"
import { eRes, Skills } from "./skills"

export const Zhongli = charbox.Factory({
    Name: "Zhongli",
    Stars: 5,
    Element: stats.stat.GEO_DMG,
    Weapon: stats.weapon.POLEARM,
    Region: stats.region.LIYUE,
    HpBase: [1143.984, 4697.817,],
    AtkBase: [19.551, 80.2811,],
    DefBase: [57.4368, 235.872,],
    StatBonus: stats.stat.GEO_DMG,
    BurstCost: 40,
    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        eRes,
        a4,
        c3,
        c5,
    ],
})
