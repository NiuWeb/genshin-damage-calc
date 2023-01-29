import { scaling } from "@src/core"
import { Filter } from "../filter"
import { OptimizerConfig } from "../type"

/** Configuration of a single substat to optimize */
export interface SubstatRange {
    /** Substat to optimize */
    stat: number
    /** Minimum rolls of the substat to optimize */
    min: number
    /** Maximum rolls of the substat to optimize */
    max: number
}

/** Base config for substats optimizer */
export interface BaseConfig {
    /** Substat rolls tier */
    tier: scaling.SubstatTier
    /** total of substats to optimize */
    total: number
    /** Substats to optimize */
    substats: SubstatRange[]
    /** Stats filter */
    filter?: Filter[]
}

/** Substats optimizer configuration */
export interface Config extends OptimizerConfig, BaseConfig { }

/** Substats optimizer result */
export interface Result {
    /** Number of rolls of each substat */
    rolls: number[]
    /** Final value of each substat */
    stats: number[]
    /** atk, def, hp */
    basic: number[]
    /** result damage */
    damage: number
    /** relative damage (%) */
    relative: number
}