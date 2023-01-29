import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a4 } from "./passives"
import { eBonus, Skills } from "./skills"

export const Chongyun = charbox.Factory({
    Name: "Chongyun",
    Stars: 4,
    Element: stats.stat.CRYO_DMG,
    Weapon: stats.weapon.CLAYMORE,
    StatBonus: stats.stat.ATK_PERCENT,
    BurstCost: 40,
    Region: stats.region.LIYUE,

    HpBase: [920.90894, 3294.9956],
    AtkBase: [18.6984, 66.90411],
    DefBase: [54.36375, 194.5125],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        eBonus,
        a4,
        c1,
        c3,
        c5,
        c6,
    ],
})