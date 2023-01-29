import { Solve } from "@bygdle/javascript-lp-solver"

/** List of variable values */
interface Vars {
    [variable: string]: number
}

/** Matrix row */
interface Row {
    /** constraint coefficients */
    left: Vars
    /** upper bound */
    right: number
}

/** List of variables */
type Variables = {
    [variable: string]: {
        [resource: string]: number
    }
}

/** List of constraints */
type Constraints = {
    [resource: string]: {
        min?: number
        max?: number
    }
}

/** List of integer variables */
type Ints = {
    [variable: string]: boolean
}
/** Model in general matrix form */
interface Matrix {
    /** coefficients of the objective function */
    c: number[]
    /** matrix of coefficients of the constraints */
    A: number[][]
    /** upper bounds of the constraints */
    b: number[]
}

/** Wrapper for the js-lp-solver in matrix form */
export class Lp {
    constructor(public readonly variables: string[]) { }

    /** 
     * prefix for naming constraints. 
     * Change if there're name conflicts with your own variables.
     */
    ConstraintPrefix = "_c_"
    /** 
     * prefix for naming coefficients of the objective function. 
     * Change if there're name conflicts with your own variables.
     */
    ObjectivePrefix = "_obj_"

    /** Integer variables list */
    private _ints: string[] = []

    /** Sets the integer variables list */
    Ints(vars: string[]): void {
        this._ints = vars
    }

    /** coefficients of the objective function */
    private objective: Vars = {}

    /** 
     * sets the coefficients of the objective function.
     * @returns the same input object to allow later modifications.
    */
    Objective(coef: Vars): Vars {
        this.objective = coef
        return coef
    }

    /** constraints matrix */
    private readonly constraints: Row[] = []

    /**
     * Creates a constraint form in the form:
     * `a1*x1 + a2*x2 + ... + an*xn <= ub`.
     * Constraint coefficients can be edited
     * by mutating the returned object.
     * 
     * @param coefficients An object in the form `{[variable]: coefficient}` 
     * representing the left side of the constraint expression.
     * @param up right side of the constraint expression, an upper bound value.
     */
    Constraint(coefficients: Vars, up: number): Vars {
        this.constraints.push({ left: coefficients, right: up })
        return coefficients
    }
    /** Transformates the matrix form to the format specific of the library */
    Format() {
        const variables: Variables = {}
        const constraints: Constraints = {}
        const ints: Ints = {}

        // initialize variables
        this.variables.forEach(v => {
            // add the coefficients of the objective function
            const coef = this.objective[v] || 0
            variables[v] = { [this.ObjectivePrefix]: coef }
        })

        // initialize constraints
        this.constraints.forEach((row, i) => {
            // row: the constraint row `a1*x1 + a2*x2 + ... + an*xn <= ub`
            // i: the constraint index [0-n)

            /** constraint name */
            const constraint = this.ConstraintPrefix + i

            // create the upper bound
            constraints[constraint] = {
                max: row.right
            }

            // add the coefficient of the constraint to each variable
            this.variables.forEach(v => {
                const coef = row.left[v]
                if (Number.isFinite(coef)) {
                    variables[v][constraint] = coef
                }
            })
        })

        // initialize ints
        for (const v of this._ints) {
            ints[v] = true
        }

        return { variables, constraints, ints }
    }

    /** Solves the model given an objective variable */
    Solve(type: "min" | "max") {
        const solution = Solve({
            optimize: this.ObjectivePrefix,
            opType: type,
            ...this.Format()
        })
        // put zeros for the variables that are not in the solution
        for (const v of this.variables) {
            if (!solution[v]) solution[v] = 0
        }
        return solution
    }

    /** converts the model to a string representation */
    toString(): string {
        return this.String()
    }

    /** Alias for .toString() */
    String(): string {
        let result = this.variables
            .map(v => (
                "var " + v + (this._ints.includes(v) ? " integer" : "") + ";"
            ))
            .join("\n")

        const matrix = this.Matrix()

        result += "\n\nmaximize z: " + this.strExpr(matrix.c) + ";\n\n"
        for (let i = 0; i < matrix.A.length; i++) {
            result += "subject to c" + i + ": " + this.strExpr(matrix.A[i]) + " <= " + matrix.b[i] + ";\n"
        }
        return result
    }

    /** Converts the model to a matrix form `min {cx}:Ax<=b` */
    Matrix(): Matrix {
        const matrix: Matrix = {
            c: [],
            A: [],
            b: [],
        }

        this.putIndex(matrix.c, this.objective)

        for (const { left, right } of this.constraints) {
            matrix.b.push(right)
            const row: number[] = Array.from(Array(this.variables.length)).fill(0)
            this.putIndex(row, left)
            matrix.A.push(row)
        }

        return matrix
    }
    /** puts the coefficient of a variable list in its corresponding position in an array */
    private putIndex(arr: number[], vars: Vars) {
        for (const v in vars) {
            const coef = vars[v]
            const index = this.variables.indexOf(v)
            if (index === -1) { continue }
            arr[index] = coef
        }
    }
    /** converts an array of coefficients to a string representation of linear expression */
    private strExpr(arr: number[]): string {
        return this.variables
            .map((v, i) => (
                arr[i] === 0 ? "" : arr[i] + "*" + v
            ))
            .filter(s => s !== "")
            .join(" + ")
            .replace(/\+\s*-/g, "-")
    }
}