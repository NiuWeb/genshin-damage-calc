import { BaseConfig } from "@src/optimizer/substats"
import { ArrayObject } from "@src/utils/combinations/array_objects"

export interface Effect {
    stacks: number
    condition: string[]
    aura: string[]
    target: string[]
}

export interface Weapon extends Partial<Effect> {
    empty?: boolean
    name: string
    rank: number
}

export interface Artifacts extends Partial<Effect> {
    empty?: boolean
    sands: number
    goblet: number
    circlet: number
    set?: string[]
    substats?: BaseConfig
}

export interface Combination {
    weapon: Weapon
    artifact: Artifacts
}

export interface CombinationGroup {
    weapon: ArrayObject<Weapon>[]
    artifact: ArrayObject<Artifacts>[]
}