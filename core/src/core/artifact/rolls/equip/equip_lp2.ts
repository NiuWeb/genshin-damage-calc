import { stat } from "@core/stats"
import { Lp } from "@src/utils/lp"
import { Options, Result } from "./type"


/** creates a variable name from a given prefix and position */
function getvar(prefix: string, x: number, y: number, z: number): string {
    return prefix + "_" + x + "_" + y + "_" + z
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
    // S_ijk: number of rolls of each substat in each artifact, for the upgrade k
    for (let j = 0; j < 5; j++) {
        for (let i = 0; i < n; i++) {
            for (let k = 0; k < 6; k++) {
                // declare variable
                variables.push(getvar("S", i, j, k))
                // variables at higher upgrade levels have higher coefficients
                coefficients[getvar("S", i, j, k)] = k + 1
                // c1. variables are binary
                model.Constraint({ [getvar("S", i, j, k)]: 1 }, 1)
            }
        }
    }

    // set all variables as integers
    model.Ints(variables)

    for (let j = 0; j < 5; j++) {
        // c4. max 9 rolls per artifact
        const c4 = model.Constraint({}, 9)
        for (let i = 0; i < n; i++) {
            // c2. max 6 rolls per substat per artifact
            const c2 = model.Constraint({}, 6)
            // c6. only rolls if selected at level 0
            const c6 = model.Constraint({ [getvar("S", i, j, 0)]: -5 }, 0)
            for (let k = 0; k < 6; k++) {
                c2[getvar("S", i, j, k)] = 1
                c4[getvar("S", i, j, k)] = 1

                // repeated substat cannot be equipped
                if (!available(i, j)) {
                    model.Constraint({ [getvar("S", i, j, k)]: 1 }, 0)
                }
            }
            for(let k = 1; k < 6; k++) {
                c6[getvar("S", i, j, k)] = 1
            }
        }

        // c3: at any upgrade, at most 4 subs can be rolled
        for (let k = 0; k < 6; k++) {
            const c3 = model.Constraint({}, 4)
            for (let i = 0; i < n; i++) {
                c3[getvar("S", i, j, k)] = 1
            }
        }
    }

    // constraint required values
    for (let i = 0; i < n; i++) {
        const c5 = model.Constraint({}, -values[i])
        for (let j = 0; j < 5; j++) {
            for (let k = 0; k < 6; k++) {
                c5[getvar("S", i, j, k)] = -1
            }
        }
    }

    // solve the model
    const solution = model.Solve("min")
    if (!solution.feasible) {
        throw new Error("[LP] Cannot find a feasible solution")
    }

    // extract solution
    const result: Result = []
    for (let j = 0; j < 5; j++) {
        const artifact: [number, number][] = []
        for (let i = 0; i < n; i++) {
            let rolls = 0
            for (let k = 0; k < 6; k++) {
                rolls += solution[getvar("S", i, j, k)] || 0
            }
            if (rolls > 0) {
                artifact.push([substats[i], rolls])
            }
        }
        result.push(artifact)
    }

    return result
}