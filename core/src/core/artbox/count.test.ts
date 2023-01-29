import { CountSets } from "./count"

describe("Get active sets", () => {
    test("no set", () => {
        const [result] = CountSets(["A", "B", "C", "D", "E"])
        expect(result.length).toBe(0)
    })
    test("only a 2-piece set", () => {
        const [result] = CountSets(["A", "B", "C", "A", "E"])
        expect(result.length).toBe(1)
        expect(new Set(result[0])).toEqual(new Set(["a", 2]))
    })
    test("Two 2-piece sets", () => {
        const [result] = CountSets(["A", "B", "C", "A", "B"])
        expect(result.length).toBe(2)
        expect(new Set(result[0])).toEqual(new Set(["a", 2]))
        expect(new Set(result[1])).toEqual(new Set(["b", 2]))
    })
    test("A 4-piece set", () => {
        const [result] = CountSets(["A", "A", "A", "A", "B"])
        expect(result.length).toBe(1)
        expect(new Set(result[0])).toEqual(new Set(["a", 4]))
    })
    test("A 5-piece set", () => {
        const [result] = CountSets(["A", "A", "A", "A", "A"])
        expect(result.length).toBe(1)
        expect(new Set(result[0])).toEqual(new Set(["a", 4]))
    })
})