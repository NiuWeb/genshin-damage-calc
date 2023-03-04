import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c1, c2, c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { Skills } from "./skills"

export const Dehya = charbox.Factory({
    Name: "Dehya",
    Stars: 5,
    Element: stats.stat.PYRO_DMG,
    Weapon: stats.weapon.CLAYMORE,
    StatBonus: stats.stat.HP_PERCENT,
    Region: stats.region.SUMERU,
    BurstCost: 70,

    HpBase: [1220.2496, 5011.0044],
    AtkBase: [20.6682, 84.8686],
    DefBase: [48.88111, 200.7369],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        c1,
        c2,
        c3,
        c5,
        c6
    ]
})				