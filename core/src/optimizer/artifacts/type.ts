import { artifact } from "@src/core"
import { ReadOnly } from "@src/utils"
import { Filter } from "../filter"
import { OptimizerConfig } from "../type"

export interface Row {
    /** artifact indexes in the original array */
    indexes: number[]
    /** set names */
    sets: string[]
    /** sum of all artifact stats */
    stats: { stat: number, value: number }[]
}

export interface Result {
    /** artifact indexes in the original array */
    indexes: number[]
    /** set names */
    sets: string[]
    /** config command */
    cmd: string
    damage: number
    relative: number
}

export interface SetConfig {
    /**
     * Number of set effects allowed.
     * - 0: allowed combinations without set effects.
     * - 2: allowed combinations with 2-piece set effects.
     * - 4: allowed combinations with 4-piece set effects.
     * If undefined, all combinations will be allowed.
     * Defaults undefined.
     */
    allowSetNumber?: number[]

    /**
     * If defined, only combinations that include this
     * set names will be allowed.
     * Defaults undefined.
     */
    allowOnly?: string[]
}

export interface BaseConfig extends SetConfig {
    /** artifacts to optimize */
    artifacts: ReadOnly<artifact.Exported[]>
    /** code to configure set effects */
    ConfigCmd?: string

    /** Stat filters */
    filter?: Filter[]
}

export interface Config extends BaseConfig, OptimizerConfig { }