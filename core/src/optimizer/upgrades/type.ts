import { OptimizerConfig } from "../type"
import { CostList } from "./cost/type"
import { UpgradeData } from "./upgrades/upgrades"
/** base config for upgrades  */
export interface BaseConfig {
    resourceCmd: string
    costs?: {
        [stars: number]: CostList
    }
}

export interface Config extends OptimizerConfig, BaseConfig { }

export interface Row {
    step: "upgrade" | "evaluate"
    upgrade: UpgradeData
}

export interface Result {
    upgrade: UpgradeData
    damage: number
    relative: number
}