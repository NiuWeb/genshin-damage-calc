import { scaling, stats, weapon } from "@src/core"
import { Blackcliff } from "../families/blackcliff"

export const BlackcliffSlasher = weapon.Factory({
    Name: "BlackcliffSlasher",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        Blackcliff("BlackcliffSlasher1")
    ]
})