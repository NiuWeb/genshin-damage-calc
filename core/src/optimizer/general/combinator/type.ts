import { Filter } from "@src/optimizer/filter"
import { SubstatRange } from "@src/optimizer/substats"

export interface Effect {
    stacks: number
    condition: string
    aura: string[]
}

export interface Weapon extends Partial<Effect> {
    name: string
    rank: number
}

export interface Artifacts extends Partial<Effect> {
    sands: string
    goblet: string
    circlet: string
    set?: string
    substats?: SubstatRange[]
    filter?: Filter[]
}

export interface Combination {
    weapon: Weapon
    artifact: Artifacts
}