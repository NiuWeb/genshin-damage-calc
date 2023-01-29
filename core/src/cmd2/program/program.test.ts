import { Program } from "./program"
import { CountArgs } from "./utils"

describe("Create cli program", () => {
    const state = { result: NaN }
    const program = new Program(state)

    program.Set({
        "sum": {
            description: "sum two numbers",
            arguments: ["a", "b"],
            example: "sum 3 4",

            compile({ Value, Log }, [a, b]) {
                const A = parseFloat(a)
                const B = parseFloat(b)
                const c = A + B
                return () => {
                    Value.result = c
                    Log.Logf("result: %d + %d = %d", A, B, c)
                }
            }
        },
        "get": {
            description: "gets the last sum result",
            arguments: [],

            compile({ Value, Log }) {
                return () => {
                    Log.Logf("Last sum: %d", Value.result)
                }
            }
        }
    })

    test("compile and run a command", () => {
        const get = program.Compile(["get"])
        const sum = program.Compile(["sum", "3", "4"], { line: 36 })
        expect(state.result).toBeNaN()
        get()
        sum()
        get()
        expect(state.result).toBe(7)
    })

    test("Compile a command string", () => {
        const fn = program.CompileString(`
            const $x 35 // first value to sum
            const $y 17 // second value to sum
            /*
            do something
            */
           sum $x $y // $yuyu
           get
        `)
        fn()
        expect(state.result).toBe(35 + 17)
    })
    test("Compile a command string with predefined constants", () => {
        const fn = program.CompileString(`
            /*
            do something
            */
           sum $x $y // $yuyu
           get
        `, { constants: { x: "8", y: "9" } })
        fn()
        expect(state.result).toBe(8 + 9)
    })

    test("Throws if wrong number of arguments", () => {
        expect(() => (
            program.Compile(["get", "hello"])
        )).toThrow()
        expect(() => (
            program.Compile(["sum", "45"])
        )).toThrow()
        expect(() => (
            program.Compile(["sum", "1", "2", "3"], { line: 177 })
        )).toThrow()
        expect(() => (
            program.Compile(["sum"])
        )).toThrow()
    })
    test("Throws if command not found", () => {
        expect(() => (
            program.Compile(["unknown", "command"], { line: 3 })
        )).toThrow()
    })
})

describe("Validate arguments count", () => {
    test("any number of arguments", () => {
        const [min, max] = CountArgs()
        expect(min).toBe(0)
        expect(max).toBe(Infinity)
    })
    test("exactly one argument", () => {
        const [min, max] = CountArgs(["one"])
        expect(min).toBe(1)
        expect(max).toBe(1)
    })
    test("exactly three argument", () => {
        const [min, max] = CountArgs(["one", "two", "three"])
        expect(min).toBe(3)
        expect(max).toBe(3)
    })
    test("two or more argument", () => {
        const [min, max] = CountArgs(["one", "two", "more..."])
        expect(min).toBe(2)
        expect(max).toBe(Infinity)
    })
})