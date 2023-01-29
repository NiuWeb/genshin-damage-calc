import { SubstatTier } from "@core/scaling"

/** Substats to equip */
export type Substats = [stat: number, count: number][]

/** options for the "equip rolls" solver */
export interface Options {
    /** artifact stars */
    stars: number
    /** sands, goblet and circlet */
    mainstats: [number, number, number]
    /** number of substats to equip */
    substats: Substats
    /** tier */
    tier: SubstatTier
}

/**
 * An array that stores generated artifact substats.
 * Each index represents an artifact, which is another
 * array that cointains pairs [stat, value]
 */
export type Result = Substats[]