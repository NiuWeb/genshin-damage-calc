import { effect } from "@src/core"
import { OptimizerConfig } from "../type"

/** single sets optimizer combination  */
export interface Row {
    /** artifact sets names */
    sets: [string, string]
    /** sequence of configuration commands for any effect in the set */
    cmds: {
        [effectName: string]: string[]
    }
}

/** effect state */
export interface State {
    /** effect name */
    effect: string
    /** effect saved state */
    state: effect.Exported
    /** command to re-create the state */
    cmd: string
}

/** sets optimizer result */
export interface Result {
    /** artifact sets names */
    sets: [string, string]
    /** set effect states */
    states: State[]
    damage: number
    relative: number
}

export interface BaseConfig {
    /** code to configure set effects */
    ConfigCmd?: string
}

export interface Config extends BaseConfig, OptimizerConfig { }