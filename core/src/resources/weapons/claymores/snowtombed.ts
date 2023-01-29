import { scaling, stats, weapon } from "@src/core"
import { FrostBurial } from "../families/frostburial"

export const SnowTombedStarsilver = weapon.Factory({
    Name: "SnowTombedStarsilver",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_44,
    Substat: stats.stat.PHYSICAL_DMG,

    Effects: [
        FrostBurial("SnowTombedStarsilver1", "HIT_SnowTombedStarsilver")
    ]
})