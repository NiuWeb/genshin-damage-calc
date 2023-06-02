import { sets, weapons } from "@src/resources"
import { Sets, Weapons } from "./data"

/**
 * Tests if the names in Enka.Network API are the same as in Core
 * @param name The name to display in the test
 * @param inEnka Names existing in Enka
 * @param inCore Names existing in Core
 */
function runTest(name: string, inEnka: string[], inCore: string[]) {
    test(`${name} missing in Enka`, () => {
        const enka = new Set(inEnka)
        const core = new Set(inCore)

        expect(enka).toEqual(core)
    })
    test(`duplicate ${name} in enka`, () => {
        const dupes = inEnka.filter((item, index) => inEnka.indexOf(item) !== index)

        expect(new Set(dupes)).toEqual(new Set())
    })
}

describe("Test weapons in Enka.Network API", () => {
    runTest("weapons", Object.values(Weapons), weapons.GetList().map(weapon => weapon.Name))
})

describe("Test sets in Enka.Network API", () => {
    runTest("sets", Object.values(Sets), sets.GetList().map(set => set.Name))
})