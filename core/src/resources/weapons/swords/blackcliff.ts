import { scaling, stats, weapon } from "@src/core"
import { Blackcliff } from "../families/blackcliff"

export const BlackcliffLongsword = weapon.Factory({
    Name: "BlackcliffLongsword",
    Stars: 4,
    Type: stats.weapon.SWORD,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        Blackcliff("BlackcliffLongsword1")
    ]
})