import { scaling, stats, weapon } from "@src/core"
import { FrostBurial } from "../families/frostburial"

export const Frostbearer = weapon.Factory({
    Name: "Frostbearer",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        FrostBurial("Frostbearer1", "HIT_Frostbearer")
    ]
})