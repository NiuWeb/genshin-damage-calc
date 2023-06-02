import { scaling, stats, weapon } from "@src/core"
import { Blackcliff } from "../families/blackcliff"

export const BlackcliffWarbow = weapon.Factory({
    Name: "BlackcliffWarbow",
    Stars: 4,
    Type: stats.weapon.BOW,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        Blackcliff("BlackcliffWarbow1")
    ]
})