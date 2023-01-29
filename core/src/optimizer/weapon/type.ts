import { effect } from "@src/core"
import { OptimizerConfig } from "../type"

/** row for weapons optimizer */
export interface Row {
    /** weapon name */
    weapon: string
    /** sequence of configuration commands for any effect in the weapon */
    cmds: {
        [effectName: string]: string[]
    }
    /** configuration command for THE WEAPON (not its effects) */
    cmd: string
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

/** weapons optimizer result */
export interface Result {
    /** weapons names */
    weapon: string
    /** set effect states */
    states: State[]
    /** command to re-create the weapon state */
    cmd: string
    /** weapon rank */
    rank: number
    damage: number
    relative: number
}

/** weapons optimizer config */
export interface BaseConfig {
    /** code to configure weapons */
    ConfigCmd?: string
    /** Whether to optimize ALL weapons (true) or only the corresponding to the target */
    All?: boolean
    /** ranks to include, per weapon stars */
    Ranks?: {
        [stars: number]: number[]
    }
}

/** weapons optimizer config */
export interface Config extends BaseConfig, OptimizerConfig { }