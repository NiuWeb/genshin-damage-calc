import { scaling } from "@src/core"
import { OptimizerConfig } from "../type"
/**
 * Base config for "next roll benefit" optimizer
 */
export interface BaseConfig {
    /** roll tier to use (0, 1, 2, 3, or 4 for average) */
    tier: scaling.SubstatTier
}
/**
 * stat to calculate benefit of
 */
export type Row = number
/** config for "next roll benefit" optimizer */
export interface Config extends BaseConfig, OptimizerConfig { }

/** optimal "next roll" result for a single stat */
export interface Result {
    stat: number
    damage: number
    benefit: number
}