import { effect, scaling, stats, weapon } from "@src/core"
import { MillennialMovement } from "../families/millenial"

export const SongOfBrokenPines = weapon.Factory({
    Name: "SongOfBrokenPines",
    Stars: 5,
    Type: stats.weapon.CLAYMORE,
    Scaling: scaling.WeaponScaling.TYPE_49,
    Substat: stats.stat.PHYSICAL_DMG,

    Effects: [
        effect.Factory({
            Name: "SongOfBrokenPines1",
            MaxRank: 5,
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.16, 0.2, 0.24, 0.28, 0.32)
                .Build()
        }),
        MillennialMovement({
            Name: "SongOfBrokenPines2",
            OnApply: new effect.Builder()
                .stat
                .Char(stats.stat.ATK_PERCENT)
                .Values(0.2, 0.25, 0.3, 0.35, 0.4)
                .Build()
        }),
    ]
})