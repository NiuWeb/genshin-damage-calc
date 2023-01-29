import { RestrictedInts } from "./restricted_ints"

test("generation of combinations with Restricted Ints", () => {
    const generator = RestrictedInts(4, 25, [0, 0, 0, 0], [12, 12, 12, 12])
    const combinations: number[][] = []

    for (const combi of generator) {
        combinations.push(combi)
    }
    expect(combinations.length).toBe(1456)
})