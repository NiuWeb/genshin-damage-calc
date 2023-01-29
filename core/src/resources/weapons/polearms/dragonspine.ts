import { scaling, stats, weapon } from "@src/core"
import { FrostBurial } from "../families/frostburial"

export const DragonspineSpear = weapon.Factory({
    Name: "DragonspineSpear",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_41,
    Substat: stats.stat.PHYSICAL_DMG,

    Effects: [
        FrostBurial("DragonspineSpear1", "HIT_DragonspineSpear")
    ]
})