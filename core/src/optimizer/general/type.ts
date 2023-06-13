import { OptimizerConfig } from "../type"

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
export type Result = number