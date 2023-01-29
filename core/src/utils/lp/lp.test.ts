import { Lp } from "./lp"

describe("Linear programming wrapper", () => {
    const lp = new Lp(["x", "y"])
    lp.Objective({ x: 0.5, y: 0.25 })
    lp.Constraint({ x: 2, y: 3 }, 5)
    lp.Constraint({ x: -1 }, -2)

    test("format objective function", () => {
        const format = lp.Format()
        expect(format.variables["x"][lp.ObjectivePrefix]).toBeCloseTo(0.5)
        expect(format.variables["y"][lp.ObjectivePrefix]).toBeCloseTo(0.25)
    })
    test("format left side of the constraints", () => {
        const format = lp.Format()
        expect(format.variables["x"][lp.ConstraintPrefix + "0"]).toBeCloseTo(2)
        expect(format.variables["y"][lp.ConstraintPrefix + "0"]).toBeCloseTo(3)
        expect(format.variables["x"][lp.ConstraintPrefix + "1"]).toBeCloseTo(-1)
    })
    test("format right side of the constraints", () => {
        const format = lp.Format()
        expect(format.constraints[lp.ConstraintPrefix + "0"].max).toBeCloseTo(5)
        expect(format.constraints[lp.ConstraintPrefix + "1"].max).toBeCloseTo(-2)
    })

    test("Solve the model", () => {
        const result = lp.Solve("max")

        expect(result["x"]).toBeCloseTo(2.5)
        expect(result["y"]).toBeCloseTo(0)
    })

    test("Convert to a matrix form", () => {
        const matrix = lp.Matrix()

        expect(new Set(matrix.c)).toEqual(new Set([0.5, 0.25]))
        expect(new Set(matrix.b)).toEqual(new Set([5, -2]))
        expect(new Set(matrix.A[0])).toEqual(new Set([2, 3]))
        expect(new Set(matrix.A[1])).toEqual(new Set([-1, 0]))
    })
})