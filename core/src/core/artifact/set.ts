import { Generator as EffectGenerator } from "@core/effect"

/** Artifact set */
export interface Set {
    /** Artifact set name */
    Name: string
    /** Artifact set stars */
    Stars: number
    /** Effects of the 2-piece set */
    Piece2: EffectGenerator[]
    /** Effects of the 4-piece set */
    Piece4: EffectGenerator[]
}

/** Creates an artifact set */
export function Set(set: Set): Set {
    return set
}