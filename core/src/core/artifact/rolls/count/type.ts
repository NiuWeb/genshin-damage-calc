/**
 * Substats counter options
 */
 export interface Options {
    /** Artifact level (0-20) */
    level: number
    /** Artifact stars (4-5) */
    stars: number
    /** artifact substats */
    substats: [stat: number, count: number][]
}

/**
 * An array that stores the counted rolls, in the form [stat, [...# rolls of each tier]]
 */
export type Result = [stat: number, rolls: number[]][]