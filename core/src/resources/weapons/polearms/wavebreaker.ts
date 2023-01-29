import { scaling, stats, weapon } from "@src/core"
import { Wavewalker } from "../families/wavewalker"

export const WavebreakerFin = weapon.Factory({
    Name: "WavebreakerFin",
    Stars: 4,
    Type: stats.weapon.POLEARM,
    Scaling: scaling.WeaponScaling.TYPE_45,
    Substat: stats.stat.ATK_PERCENT,

    Effects: [
        Wavewalker("WavebreakerFin1")
    ]
})