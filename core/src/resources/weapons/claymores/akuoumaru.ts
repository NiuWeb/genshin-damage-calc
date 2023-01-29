import { scaling, stats, weapon } from "@src/core"
import { Wavewalker } from "../families/wavewalker"

export const Akuoumaru = weapon.Factory({
    Name: "Akuoumaru",
    Stars: 4,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_42,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        Wavewalker("Akuoumaru1")
    ]
})