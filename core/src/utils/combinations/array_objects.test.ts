import { CombinateArrayObjects } from "./array_objects"

describe("combinations of array objects", () => {
    const gen = CombinateArrayObjects({
        a: [1, 2, 3, 4],
        b: ["a", "b"],
        c: [{ a: 8 }, { a: 9 }, { a: 10 }],
    })
    const arr = Array.from(gen)

    test("All combinations should be generated", () => (
        expect(arr.length).toBe(4 * 2 * 3)
    ))

    test("All combinations should have properties {a: number, b: string, c: object}", () => {
        for (const combi of arr) {
            expect(typeof combi.a).toBe("number")
            expect(typeof combi.b).toBe("string")
            expect(typeof combi.c).toBe("object")
        }
    })
})