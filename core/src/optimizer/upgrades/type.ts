import { OptimizerConfig } from "../type"
import { CostList, CostResult } from "./cost/type"
import { Criteria, CriteriaValues } from "./criteria"
import { UpgradeData } from "./upgrades/upgrades"
/** base config for upgrades  */
export interface BaseConfig {
    resourceCmd: string
    criteria: Criteria
    costs?: {
        [stars: number]: CostList
    }
}

export interface Config extends OptimizerConfig, BaseConfig { }

export interface Row {
    step: "upgrade" | "evaluate"
    upgrade: UpgradeData
    cmd: string
    damage?: number
}

export interface Result extends CriteriaValues {
    criteria: Criteria
    cmd: string
    costData: CostResult
    upgrade: UpgradeData
    relative: number
    increase: number
    selected?: boolean
}

export type Curve = [cost: number, damage: number][]