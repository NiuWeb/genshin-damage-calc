import { charbox, stats } from "@src/core"
import { Bursts, qBonus } from "./bursts"
import { c2, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { eBonus, Skills } from "./skills"

export const HuTao = charbox.Factory({
    Name: "HuTao",
    Element: stats.stat.PYRO_DMG,
    Region: stats.region.LIYUE,
    Stars: 5,
    Weapon: stats.weapon.POLEARM,
    HpBase: [1210.7164, 4971.856],
    AtkBase: [8.2859, 34.0239],
    DefBase: [68.2062, 280.098],
    StatBonus: stats.stat.CRIT_DMG,
    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        eBonus,
        qBonus,
        a1,
        a4,
        c2,
        c3,
        c4,
        c5,
        c6,
    ],
    BurstCost: 60
})