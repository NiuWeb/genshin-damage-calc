import { Filter } from "@src/optimizer/filter"
import { SubstatRange } from "@src/optimizer/substats"
import { ArrayObject } from "@src/utils/combinations/array_objects"

export interface Effect {
    stacks: number
    condition: string[]
    aura: string[]
    target: string[]
}

export interface Weapon extends Partial<Effect> {
    name: string
    rank: number
}

export interface Artifacts extends Partial<Effect> {
    sands: number
    goblet: number
    circlet: number
    set?: string[]
    substats?: SubstatRange[]
    filter?: Filter[]
}

export interface Combination {
    weapon: Weapon
    artifact: Artifacts
}

export interface CombinationGroup {
    weapon: ArrayObject<Weapon>[]
    artifact: ArrayObject<Artifacts>[]
}