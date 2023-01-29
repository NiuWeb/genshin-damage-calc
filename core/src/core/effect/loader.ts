import { Effect } from "./effect"

/** Exported effect */
export interface Exported {
    enabled: boolean
    rank: number
    stacks: number
    auras: readonly number[]
    conditions: readonly string[]
}

/** Exports effect data */
export function Export(ef: Effect): Exported {
    return {
        enabled: ef.Enabled(),
        rank: ef.GetRank(),
        stacks: ef.GetStacks(),
        auras: ef.GetAuras(),
        conditions: ef.GetConditions(),
    }
}

/** Imports data to an effect */
export function Import(data: Exported, ef: Effect): void {
    if (data.enabled) {
        ef.Enable()
    } else {
        ef.Disable()
    }
  
    ef.SetRank(data.rank)
    ef.SetStacks(data.stacks)
    ef.SetAuras(...data.auras)
    ef.SetConditions(...data.conditions)
}