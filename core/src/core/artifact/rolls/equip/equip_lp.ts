import { stat } from "@core/stats"
import { Lp } from "@src/utils/lp"
import { Options, Result } from "./type"


/** creates a variable name from a given prefix and position */
function getvar(prefix: string, x: number, y: number): string {
    return prefix + "_" + x + "_" + y
}

/** 
 * Finds a distribution of the given substat rolls between the 5 artifacts
 * using a linear programming model.
*/
export function EquipRollsLp(options: Options): Result {
    // variable i: index of the substat
    // variable j: index of the artifact

    // fill substats pool to have at least 5
    const len = options.substats.length
    for (let i = 0; i < 5 - len; i++) {
        options.substats.push([stat.NONE, 0])
    }

    const mainstats = [stat.HP_FLAT, stat.ATK_FLAT, ...options.mainstats]
    const substats = options.substats.map(([s]) => s)
    const values = options.substats.map(([, v]) => v)

    const n = substats.length

    /** checks if a substat can be equipped to an artifact */
    function available(i: number, j: number): boolean {
        return substats[i] !== mainstats[j]
    }

    /** variable names */
    const variables: string[] = []

    // create the LP model
    const model = new Lp(variables)
    const coefficients = model.Objective({})

    // create variables
    // S_ij: number of rolls of each substat in each artifact
    // A_ij: auxiliar variable to keep rolls under artifact constraints.
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < n; i++) {
            variables.push(getvar("S", i, j))
            variables.push(getvar("A", i, j))
            if (substats[i] === stat.NONE) {
                coefficients[getvar("A", i, j)] = 2
                coefficients[getvar("S", i, j)] = 1
            } else {
                coefficients[getvar("A", i, j)] = 4
                coefficients[getvar("S", i, j)] = 2
            }
        }
    }

    // set all variables as integers
    model.Ints(variables)

    for (let j = 0; j < 5; j++) {
        /** constraint (C5): min 4 substat selected per artifact */
        const A_j_min = model.Constraint({}, -4)
        /** constraint (C5): max 4 substat selected per artifact */
        const A_j_max = model.Constraint({}, 4)
        /** constraint (C2): max 9 substats selected per artifact */
        const S_j_max = model.Constraint({}, 9)

        for (let i = 0; i < n; i++) {
            // include coefficients for constraint (C5)
            A_j_min[getvar("A", i, j)] = -1
            A_j_max[getvar("A", i, j)] = 1
            // include coefficients for constraint (C2)
            S_j_max[getvar("S", i, j)] = 1

            /** constraint (C4): 
             * each substat on each artifact must be selected only once,
             * and only if available 
             */
            model.Constraint({ [getvar("A", i, j)]: 1 }, available(i, j) ? 1 : 0)

            /** constraint (C6): each selected substat must have 6 rolls at most */
            model.Constraint({
                [getvar("S", i, j)]: 1,
                [getvar("A", i, j)]: available(i, j) ? -6 : 0,
            }, 0)

            /** constraint (C6): each selected substat must have 1 rolls at least */
            model.Constraint({
                [getvar("S", i, j)]: -1,
                [getvar("A", i, j)]: available(i, j) ? 1 : 0,
            }, 0)
        }
    }

    for (let i = 0; i < n; i++) {
        /** constraint (C3): Minimum total rolls for each substat */
        const S_t_max = model.Constraint({}, -values[i])
        for (let j = 0; j < 5; j++) {
            S_t_max[getvar("S", i, j)] = -1
        }
    }
    /** Model solution */
    const solution = model.Solve("min")
    if (!solution.feasible) {
        throw new Error("[LP] Cannot find a feasible solution")
    }

    const totals: { [stat: number]: number } = {}
    /** Result array */
    const result: Result = []
    // recover the variables from the solution
    for (let j = 0; j < 5; j++) {
        result.push([])
        for (let i = 0; i < options.substats.length; i++) {
            const [optsub, optval] = options.substats[i]
            if (!totals[optsub]) totals[optsub] = 0
            
            const varname = getvar("S", i, j)
            const value = Math.max(
                0,
                Math.min(solution[varname] || 0, optval - totals[optsub])
            )
            if (value > 0 && optsub !== stat.NONE) {
                result[j].push([optsub, value])
            }
            totals[optsub] += value
        }
    }
    return result
}