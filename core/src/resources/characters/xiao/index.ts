import { charbox, stats } from "@src/core"
import { qBonus } from "./bursts"
import { c2, c3, c4, c5 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { Skills } from "./skills"

export const Xiao = charbox.Factory({
    Name: "Xiao",
    Stars: 5,
    Element: stats.stat.ANEMO_DMG,
    StatBonus: stats.stat.CRIT_RATE,
    Weapon: stats.weapon.POLEARM,
    Region: stats.region.LIYUE,
    BurstCost: 70,

    HpBase: [991.4528, 4071.4412],
    AtkBase: [27.1852, 111.628975],
    DefBase: [62.2232, 255.528],

    Normals,
    Skills,
    Bursts: [],
    Extra: [],
    Effects: [
        qBonus,
        a1,
        a4,
        c2,
        c3,
        c4,
        c5,
    ],
})

