import { GetSubstatMaxRolls, GetSubstatValue } from "@core/scaling"
import { FlatStats } from "@core/stats"
import { Lp } from "@src/utils/lp"
import { Options, Result } from "./type"


/** creates a variable name from a given prefix and position */
function getvar(prefix: string, x: number, y: number): string {
    return prefix + "_" + x + "_" + y
}

/**
 * Finds the minimum rolls count for the given substats.
 * It uses a linear programming approach, and will throw and
 * error if the solution is not feasible.
 * @param options The solver options.
 * @returns Array of pairs [stat, [...# rolls of each tier]]
 */

export function CountRollsLp(options: Options): Result {
    const { level, stars } = options
    if (level < 0 || level > 20) {
        throw new Error("Level must be between 0 and 20")
    }
    if (stars !== 4 && stars !== 5) {
        throw new Error("Stars must be 4 or 5")
    }
    if (options.substats.length > 4) {
        throw new Error("Stats must be less or equal than 4")
    }
    // insert 4 subs
    while (options.substats.length < 4) {
        options.substats.push([0, 0])
    }

    /** upgrade number (0 for levels [0-3], 1 for [4-7], ..., 4 for [16-19], 5 for 20) */
    const upgrade = Math.floor(options.level / 4)
    const totalMin = options.stars - 2 + upgrade
    const totalMax = totalMin + 1

    /** substat numeric ids */
    const substats = options.substats.map(([s]) => s)
    /** Expected value for each sub, the right side of the constraints */
    const expected = options.substats.map(([, v]) => v)
    /** Accepted error margin for each stat */
    const margin = options.substats.map(([s]) => FlatStats.includes(s) ? 0.5 : 0.001)
    /** max rolls per substat */
    const maxRolls = GetSubstatMaxRolls(options.stars)

    /** named variables */
    const variables: string[] = []
    // variable i: index of the substat
    // variable j: index of the roll tier.

    // initialize all variables
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            variables.push(getvar("R", i, j))
        }
    }
    // lp model
    const model = new Lp(variables)
    model.Ints(variables)

    // objective function has al coefficients 1
    const objective = model.Objective({})
    for (const v of variables) {
        objective[v] = 1
    }

    /** constraint C2: Maximun total rolls */
    const R_max = model.Constraint({}, totalMax)
    /** constraint C2: Minimum total rolls */
    const R_min = model.Constraint({}, -totalMin)
    for (let i = 0; i < 4; i++) {
        /** constraint C1: max rolls per substat */
        const R_ij_max = model.Constraint({}, maxRolls)

        /** constraint C2: max substat value */
        const R_i_max = model.Constraint({}, expected[i] + margin[i])
        /** constraint C2: min substat value */
        const R_i_min = model.Constraint({}, -expected[i] + margin[i])

        for (let j = 0; j < 4; j++) {
            // var name
            const v = getvar("R", i, j)
            // add coefficient to C1
            R_ij_max[v] = 1
            // add coefficient to C2
            R_max[v] = 1
            R_min[v] = -1

            R_i_max[v] = GetSubstatValue(stars, substats[i], j)
            R_i_min[v] = -R_i_max[v]
        }
    }

    const solution = model.Solve("min")

    if (!solution.feasible) {
        throw new Error("[LP] Cannot find a feasible solution")
    }

    const result: Result = []
    // recover the solved variables from the solution
    for (let i = 0; i < 4; i++) {
        if (substats[i] === 0) { continue }
        const row: Result[number] = [substats[i], []]
        for (let j = 0; j < 4; j++) {
            const varname = getvar("R", i, j)
            const value = solution[varname] || 0
            row[1].push(value)
        }
        result.push(row)
    }
    return result
}