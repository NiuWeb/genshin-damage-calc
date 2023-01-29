import { charbox, stats } from "@src/core"
import { Bursts, qAbsorb } from "./bursts"
import { c2, c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1, a4 } from "./passives"
import { ePlunge, Skills } from "./skills"

export const Kazuha = charbox.Factory({
    Name: "Kazuha",
    Stars: 5,
    Weapon: stats.weapon.SWORD,
    Region: stats.region.INAZUMA,
    Element: stats.stat.ANEMO_DMG,
    StatBonus: stats.stat.ELEMENTAL_MASTERY,
    BurstCost: 60,

    HpBase: [1039.1188, 4267.1836],
    AtkBase: [23.0888, 94.80817],
    DefBase: [62.8215, 257.985],

    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        ePlunge,
        qAbsorb,
        a1,
        a4,
        c2,
        c3,
        c5,
        c6,
    ],
})