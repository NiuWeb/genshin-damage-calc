import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a4 } from "./passives"
import { Skills } from "./skills"

export const Faruzan = charbox.Factory({
    Name: "Faruzan",
    Stars: 4,
    Element: stats.stat.ANEMO_DMG,
    Weapon: stats.weapon.BOW,
    StatBonus: stats.stat.ATK_PERCENT,
    BurstCost: 80,
    Region: stats.region.SUMERU,

    HpBase: [802.3761, 2870.8872],
    AtkBase: [16.4724, 58.939335],
    DefBase: [52.647, 188.37],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        qBonus,
        a4,
        c3,
        c5,
        c6,
    ],
})				