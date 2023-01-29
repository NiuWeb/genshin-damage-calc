import { GetSubstatValue } from "@src/core/scaling"
import type { Artifact } from "../artifact"

/**
 * Converts a 5-star artifact to a 4-star artifact,
 * reducing substat values.
 */
export function Downgrade(artifact: Artifact): void {
    if (artifact.GetStars() === 4) { // don't transform if it's already a 4-star piece
        return
    }
    Scale(artifact, 4)
    artifact.SetStars(4)
}

/**
 * Changes the artifact stars also scaling the value
 * of all substats to the new rarity.
 * Changing from 5-stars to 4-stars will reduce the value
 * of the substats, and viceversa.
 * @param artifact the artifact to transform
 * @param stars The new artifact stars
 */
export function Scale(artifact: Artifact, stars: number): void {
    const currStars = artifact.GetStars()

    for (let i = 0; i < artifact.SubstatsLength(); i++) {
        const stat = artifact.GetSubstat(i)
        const value = artifact.GetSubstatValue(i)

        const current = GetSubstatValue(currStars, stat, 0)
        const next = GetSubstatValue(stars, stat, 0)

        const newval = value * next / current
        artifact.SetSubstatValue(i, newval)
    }
}