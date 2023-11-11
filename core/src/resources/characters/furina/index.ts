import { charbox, stats } from "@src/core"
import { Normals } from "./normals"
import { Skills, eBouns } from "./skills"
import { Bursts, qBonus } from "./bursts"
import { a4 } from "./passives"
import { c2, c3, c5, c6 } from "./constellations"

export const Furina = charbox.Factory({
    Name: "Furina",
    Stars: 5,
    Element: stats.stat.HYDRO_DMG,
    Weapon: stats.weapon.SWORD,
    StatBonus: stats.stat.CRIT_RATE,
    BurstCost: 60,
    Region: stats.region.FONTAINE,

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        eBouns,
        qBonus,
        a4,
        c2,
        c3,
        c5,
        c6,
    ],
    HpBase: [1191.65, 4893.5590820312],
    AtkBase: [18.9924, 77.987365722656],
    DefBase: [54.146148681641, 222.35850524902]
})