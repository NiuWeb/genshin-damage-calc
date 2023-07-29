import { ResourceList } from "../resources/pool"

export type CostResult = ResourceList & { cost: number }

export interface CostList {
    [name: string]: CostResult
}