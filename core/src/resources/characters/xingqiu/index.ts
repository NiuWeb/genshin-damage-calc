import { charbox, stats } from "@src/core"
import { Bursts } from "./bursts"
import { c2, c3, c4, c5 } from "./constellations"
import { Normals } from "./normals"
import { a4 } from "./passives"
import { Skills } from "./skills"

export const Xingqiu = charbox.Factory({
    Name: "Xingqiu",
    Stars: 4,
    Element: stats.stat.HYDRO_DMG,
    Weapon: stats.weapon.SWORD,
    Region: stats.region.LIYUE,
    HpBase: [857.08356, 3066.6296],
    AtkBase: [16.9176, 60.53229],
    DefBase: [63.51975, 227.2725],
    StatBonus: stats.stat.ATK_PERCENT,
    Normals,
    Skills,
    Bursts,
    Extra: [],
    Effects: [a4, c2, c3, c4, c5],
    BurstCost: 80
})