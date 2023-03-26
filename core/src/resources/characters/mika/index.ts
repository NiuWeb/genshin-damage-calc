import { charbox, stats } from "@src/core"
import { c3, c5, c6 } from "./constellations"
import { Normals } from "./normals"
import { a1 } from "./passives"
import { Skills } from "./skills"

export const Mika = charbox.Factory({
    Name: "Mika",
    Element: stats.stat.CRYO_DMG,
    Stars: 4,
    Weapon: stats.weapon.POLEARM,
    StatBonus: stats.stat.HP_PERCENT,
    BurstCost: 70,
    Region: stats.region.MONDSTADT,

    HpBase: [1048.5597, 3751.7275],
    AtkBase: [18.6984, 66.90411],
    DefBase: [59.800125, 213.96375],

    Normals,
    Skills,
    Bursts: [],
    Extra: [],
    Effects: [
        a1,
        c3,
        c5,
        c6,
    ],
})