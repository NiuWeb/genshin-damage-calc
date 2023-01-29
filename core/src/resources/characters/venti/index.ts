import { charbox, stats } from "@src/core"
import { Bursts, qAbsorb } from "./bursts"
import { c1, c2, c3, c4, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { Skills } from "./skills"

export const Venti = charbox.Factory({
    Name: "Venti",
    Stars: 5,
    Element: stats.stat.ANEMO_DMG,
    StatBonus: stats.stat.ENERGY_RECHARGE,
    Weapon: stats.weapon.BOW,
    Region: stats.region.MONDSTADT,
    BurstCost: 60,

    HpBase: [819.8552, 3366.7688],
    AtkBase: [20.482, 84.10402],
    DefBase: [52.0521, 213.759],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        qAbsorb,
        c1,
        c2,
        c3,
        c4,
        c5,
        c6,
    ],
})		