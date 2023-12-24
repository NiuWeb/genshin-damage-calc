import { CombinateValues } from "./values"

describe("Test combinations values", () => {

    test("N = 2", () => {
        const gen = Array.from(CombinateValues([1, 2, 3, 4], 2))
        expect(gen).toEqual([
            [1, 2],
            [1, 3],
            [1, 4],
            [2, 3],
            [2, 4],
            [3, 4],
        ])
    })

    test("N = 3", () => {
        const gen = Array.from(CombinateValues([1, 2, 3, 4], 3))
        expect(gen).toEqual([
            [1, 2, 3],
            [1, 2, 4],
            [1, 3, 4],
            [2, 3, 4],
        ])
    })

})