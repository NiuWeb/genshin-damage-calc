import { Combinator } from "./combinator"

describe("Combination of multiple weapons and artifacts", () => {
    const combinator = new Combinator()
    combinator.addWeapon({
        name: ["A", "B"],
        rank: [1, 2]
    })
    combinator.addArtifacts({
        sands: [3, 4],
        goblet: [5, 6],
        circlet: [7, 8]
    })

    const count = (2 ** 2) * (2 ** 3)
    const result = Array.from(combinator.generate())

    test("should generate all combinations", () => (
        expect(result.length).toBe(count)
    ))

    test("should generate all combinations with the correct types", () => {
        for(const combination of result) {
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