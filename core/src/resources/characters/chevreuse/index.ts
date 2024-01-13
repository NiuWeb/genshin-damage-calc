import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { Normals } from "./normals"
import { ChevreuseA1, ChevreuseA4 } from "./passives"
import { Skills } from "./skills"

export const Chevreuse = charbox.Factory({
    Name: "Chevreuse",
    Stars: 4,
    Weapon: stats.weapon.POLEARM,
    Element: stats.stat.PYRO_DMG,
    StatBonus: stats.stat.HP_PERCENT,
    BurstCost: 60,
    Region: stats.region.FONTAINE,
    HpBase: [1002.9700927734, 3588.6091308594],
    AtkBase: [16.205280303955, 57.983562469482],
    DefBase: [50.701351165771, 181.40849304199],
    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [
        ChevreuseA1,
        ChevreuseA4,
    ]
})