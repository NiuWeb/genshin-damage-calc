import { scaling, stats } from "@src/core"
import { BaseConfig } from "./type"

export const defaultConfig = (): BaseConfig => ({
    total: 25,
    tier: scaling.SubstatTier.ROLL_AVG,
    substats: [
        { stat: stats.stat.CRIT_RATE, min: 0, max: 10 },
        { stat: stats.stat.CRIT_DMG, min: 0, max: 12 },
        { stat: stats.stat.ATK_PERCENT, min: 0, max: 12 },
        { stat: stats.stat.ELEMENTAL_MASTERY, min: 0, max: 12 },
    ]
})