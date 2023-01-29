import { GetSubstatValue } from "@core/scaling"
import { RestrictedInts } from "@src/utils/combinations/restricted_ints"
import { PriorityQueue } from "@src/utils/priority/queue"
import { Options, Result } from "./type"

/**
 * Finds the minimum rolls count for the given substats.
 * It uses a brute-force approach, and an approximate solution will
 * always be found.
 * @param options The solver options.
 * @returns Array of pairs [stat, [...# rolls of each tier]]
 */
export function CountRollsBruteForce(options: Options): Result {
    const result: Result = []
    for (const [stat, value] of options.substats) {
        if (stat === 0) { continue }
        const rolls = solveBruteForce(options.stars, stat, value)
        result.push([stat, rolls])
    }
    return result
}

/**
* Gets the most probable rolls combination for this substat.
* A roll has 4 possible values [t0, t1, t2, t3], and the value
* of a specific substat is given by a combination of these rolls.
* @param stars Artifact quality stars (4 or 5)
* @param stat stat key
* @param value stat value
* @returns An array in the form `[tier 0, tier 1, tier 2, tier 3]`
*/
function solveBruteForce(stars: number, stat: number, value: number): number[] {
    if (value === 0) return []// tiers = possible roll values
    const tiers: number[] = []
    for (let tier = 0; tier < 4; tier++) {
        tiers.push(GetSubstatValue(stars, stat, tier))
    }

    // queue for storing the results sorted by error margin
    const queue = new PriorityQueue<number[]>()
    // test all combinations
    combis.forEach(combi => {
        //combination value = t0*x0 + t1*x1 + t2*x2 + t3*x3
        const gen = combi
            .map((v, i) => v * tiers[i])
            .reduce((x, y) => x + y, 0)
        // error margin
        const error = Math.floor(100 * (Math.abs(gen - value) / value))
        // store in the queue
        queue.Push(combi, -error)
    })
    // lowest error margin combination of roll values
    const [rolls] = queue.Pop()
    if (!rolls) {
        return []
    }
    return rolls
}

/** Total possible upgrades per substat. */
const upgrades = 6
/** all valid combinations in the form [x,y,z,w] */
const combis: number[][] = []
for (let i = 0; i <= upgrades; i++) {
    for (const c of RestrictedInts(4, i, [0, 0, 0, 0], [6, 6, 6, 6])) {
        combis.push(c)
    }
}