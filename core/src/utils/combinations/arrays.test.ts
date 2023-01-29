import { CombinateArrays } from "./arrays"

describe("combination of arrays", () => {
    const gen = CombinateArrays([1, 2, 3, 4], ["a", "b"], [{ a: 8 }, { a: 9 }, { a: 10 }])
    const arr = Array.from(gen)

    test("All combinations should be generated", () => (
        expect(arr.length).toBe(4 * 2 * 3)
    ))

    test("All combinations should have elements with datatype [number, string, object]", () => {
        for (const combi of arr) {
            expect(typeof combi[0]).toBe("number")
            expect(typeof combi[1]).toBe("string")
            expect(typeof combi[2]).toBe("object")
        }
    })
})