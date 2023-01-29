import { scaling, stats, weapon } from "@src/core"
import { Blackcliff } from "../families/blackcliff"

export const BlackcliffPole = weapon.Factory({
    Name: "BlackcliffPole",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.CRIT_DMG,
    Effects: [
        Blackcliff("BlackcliffPole1")
    ]
})