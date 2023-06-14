import { OptimizerConfig } from "../type"
import { Combination } from "./combinator"

/** base config for the optimizer */
export interface BaseConfig {
    /** code to configure combinations */
    ConfigCmd: string
}

/**
 * Configuration for the general optimizer
 */
export interface Config extends BaseConfig, OptimizerConfig { }

/**
 * A single result for the general optimizer
 */
export interface Result {
    combination: Combination
    damage: number
    relative: number
}