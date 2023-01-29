import { search } from "@bygdle/search-js"
import { artifact, stats } from "@src/core"
import { ReadOnly } from "@src/utils/readonly"

/** General filters */
export interface GeneralFilter {
    /** pieces to include */
    pieces?: number[]
    /** Include only `"locked"` artifacts or `"unlocked"` artitfacts.
     * Defaults `undefined` which will include both types.
     */
    only?: "locked" | "unlocked"
}

/** Filter artifacts */
export interface ArtifactFilter {
    /** 
     * pieces to apply filter to.
     * Default is all pieces
     */
    pieces?: number[]
    /** Artifact should have at least one of these mainstat */
    main?: number[]
    /** Artifact should be at least to this level */
    level?: number
    /** Artifact should have at least this stars */
    stars?: number
    /** Artifact should include these substats */
    subs?: number[]
    /**
     * Filter mode for `subs` property.
     * - `every`: artifact should have all the provided substats.
     * - `some`: artifact should have any of the provided substats.
     * Defaults `some`.
     */
    subsMode?: "every" | "some"
}

/**
 * Filters a list of artifacts
 * @param artifacts Artifacts to filter
 * @param filter Filter criteria
 * @returns Filter results
 */
export function FilterArtifacts(artifacts: readonly ReadOnly<artifact.Exported>[], filter: ArtifactFilter[], general?: GeneralFilter) {
    const filters = filter.map(f => convertFilter(f))

    if (general) {
        filters.push({
            filter(art) {
                if (general.pieces) {
                    if (!general.pieces.includes(art.piece)) {
                        return false
                    }
                }
                if (general.only) {
                    const shouldLocked = general.only === "locked"
                    if (shouldLocked !== !!art.locked) {
                        return false
                    }
                }

                return true
            }
        })
    }

    return search.Filter({
        values: artifacts,
        mode: "every",
        filters,
    })
}

function convertFilter(origin: ArtifactFilter): search.Filter<artifact.Exported> {
    const pieces = origin.pieces || stats.piece.Values()
    const subsMode = origin.subsMode || "some"
    return {
        for(art) {
            return pieces.includes(art.piece)
        },
        filter(art) {
            if (origin.main) {
                if (!origin.main.includes(art.mainstat)) {
                    return false
                }
            }
            if (origin.subs) {
                const has = art.substats.map(sub => sub.stat)
                const match = origin.subs[subsMode](want => has.includes(want))
                if (!match) {
                    return false
                }
            }
            if (Number.isFinite(origin.stars)) {
                if (art.stars < (origin.stars || 0)) {
                    return false
                }
            }
            if (Number.isFinite(origin.level)) {
                if (art.level < (origin.level || 0)) {
                    return false
                }
            }
            return true
        }
    }
}