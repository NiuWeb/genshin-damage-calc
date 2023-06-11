import { Combinator } from "./combinator"

describe("Combination of multiple groups of weapons and artifacts", () => {

    const generator = Combinator.Generate(
        {
            weapon: {
                name: ["A", "B"],
                rank: [1, 2]
            },
            artifact: {
                sands: ["C", "D"],
                goblet: ["E", "F"],
                circlet: ["G", "H"]
            }
        },
        {
            weapon: {
                name: ["I", "J", "K"],
                rank: [3]
            },
            artifact: {
                sands: ["L", "M"],
                goblet: ["N", "O", "P"],
                circlet: ["O", "P"]
            }
        }
    )

    const count = ((2 ** 2) * (2 ** 3)) + (3 * 2 * 2 * 3)
    const result = Array.from(generator)

    test("should generate all combinations", () => (
        expect(result.length).toBe(count)
    ))

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
            expect(typeof combination.artifact.sands).toBe("string")
            expect(typeof combination.artifact.goblet).toBe("string")
            expect(typeof combination.artifact.circlet).toBe("string")
        }
    })
})