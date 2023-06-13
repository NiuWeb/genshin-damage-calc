import { CombinationGroup } from "./type"
import { Combinator } from "./combinator"

describe("Combination of multiple groups of weapons and artifacts", () => {
    const groups: CombinationGroup[] = [
        {
            weapon: [
                // (2*2
                {
                    name: ["A", "B"],
                    rank: [1, 2]
                },
                // + 3*3)
                {
                    name: ["X", "Y", "Z"],
                    rank: [33, 44, 11]
                }],
            // * 
            artifact: [
                // (2*2*2)
                {
                    sands: [3, 4],
                    goblet: [5, 6],
                    circlet: [7, 8]
                }
            ]
        },
        // +
        {
            weapon: [
                // (3*1)
                {
                    name: ["I", "J", "K"],
                    rank: [3]
                }
            ],
            // *
            artifact: [
                // (2*3*2)
                {
                    sands: [9, 10],
                    goblet: [11, 12, 13],
                    circlet: [14, 15]
                }
            ]
        }
    ]
    const generator = Combinator.Generate(...groups)

    const count = (2 * 2 + 3 * 3) * (2 * 2 * 2) + (3 * 1) * (2 * 3 * 2)
    const result = Array.from(generator)

    test("should generate all combinations", () => (
        expect(result.length).toBe(count)
    ))

    test("counting is correct", () => {
        expect(result.length).toBe(Combinator.Count(...groups))
    })

    test("should generate all combinations with the correct types", () => {
        for (const combination of result) {
            expect(combination).toHaveProperty("weapon")
            expect(combination).toHaveProperty("artifact")
            expect(combination.weapon).toHaveProperty("name")
            expect(combination.weapon).toHaveProperty("rank")
            expect(combination.artifact).toHaveProperty("sands")
            expect(combination.artifact).toHaveProperty("goblet")
            expect(combination.artifact).toHaveProperty("circlet")

            expect(typeof combination.weapon.name).toBe("string")
            expect(typeof combination.weapon.rank).toBe("number")
            expect(typeof combination.artifact.sands).toBe("number")
            expect(typeof combination.artifact.goblet).toBe("number")
            expect(typeof combination.artifact.circlet).toBe("number")
        }
    })
})