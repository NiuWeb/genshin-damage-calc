import { GenerateChunks } from "./chunks"

function* countGenerator(t: number) {
    for (let i = 0; i < t; i++) {
        yield i
    }
}

describe("The chunks function groups the generated values of a generator in an array", () => {

    test("with 100 values in groups of 10", () => {
        const generator = GenerateChunks(10, countGenerator(100))

        let count = 0
        for (const chunk of generator) {
            count += chunk.length
            expect(chunk.length).toBeLessThanOrEqual(10)
        }
        expect(count).toBe(100)
    })

    test("with 95 values in groups of 10 (last chunk should be smaller)", () => {
        const generator = GenerateChunks(10, countGenerator(95))

        let count = 0
        for (const chunk of generator) {
            count += chunk.length
            expect(chunk.length).toBeLessThanOrEqual(10)
        }
        expect(count).toBe(95)
    })
})