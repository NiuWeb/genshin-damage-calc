import { charbox } from "@src/core"
import type { Optimizer } from "./optimizer"

/** Basic configuration for an optimizer */
export interface OptimizerConfig {
    /** Party to optimize */
    Party?: charbox.ExportedParty
    /** 
     * Name of the character to set as target of the optimizer.
     * This may be optional, depending on the concrete optimizer
     * tool is being used.
     */
    Target?: string
    /** Runner commands to execute: rotation code goes here */
    Cmd?: string
}

/** 
 * Gets the type of config object for an optimizer tool
 * @template Class The type of the optimizer class to get config from
 */
export type GetOptimizerConfig<Class> =
    Class extends new () => Optimizer<unknown, unknown, infer R> ? R : never

/** 
 * Gets the type of row object for an optimizer tool
 * @template Class The type of the optimizer class to get row from
 */
export type GetOptimizerRow<Class> =
    Class extends new () => Optimizer<infer R, unknown, OptimizerConfig> ? R : never
/** 
 * Gets the Type of result object for an optimizer tool
 * @template Class The type of the optimizer class to get result from
 */
export type GetOptimizerResult<Class> =
    Class extends new () => Optimizer<unknown, infer R, OptimizerConfig> ? R : never

/** Gets a generic Optimizer<P,Q,R> from a concrete optimizer class */
export type GetOptimizerClassGeneric<Class> =
    Class extends new () => Optimizer<infer P, infer Q, infer R> ? new () => Optimizer<P, Q, R> : never

/** Gets a mapped object of generic Optimizers from a concrete object of optimizer classes */
export type GetOptimizerList<List extends Record<string, unknown>> = {
    [key in keyof List]: GetOptimizerClassGeneric<List[key]>
}