import { scaling, stats, weapon } from "@src/core"
import { Blackcliff } from "../families/blackcliff"

export const BlackcliffAgate = weapon.Factory({
    Name: "BlackcliffAgate",
    Stars: 4,
    Type: stats.weapon.CATALYST,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.CRIT_DMG,

    Effects: [
        Blackcliff("BlackcliffAgate1")
    ]
})