import { OptimizerConfig } from "../type"
import { BaseConfig as SubstatsConfig, Result as SubstatsResult } from "../substats"

/** base config for mainstats optimizer */
export interface BaseConfig {
    /** 
     * if defined, the optimizer will generate a set of optimal substats 
     * with the given config for each combination of mainstats
     * */
    substats?: SubstatsConfig

    /**
     * Pieces defined here will use only the provided mainstats.
     * Provided mainstat arrays must have at least one mainstat,
     * otherwise all mainstats will be included.
     * Won't work for flower and plume, they're fixed.
     */
    mainstats?: {
        [piece: number]: number[]
    }
}

/** Mainstats optimizer config */
export interface Config extends OptimizerConfig, BaseConfig { }

/** Mainstats optimizer results */
export interface Result {
    mainstats: number[]
    substats?: SubstatsResult
    damage: number
    relative: number
}