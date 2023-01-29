import * as list from "./list"

describe("Character list", () => {
    test("All damage instances starts with \"HIT_\"", () => {
        Object.values(list).forEach(generator => {
            const char = generator()
            char.GetInstances().forEach(ins => (
                expect(ins.Options.Name).toMatch(/^HIT_/)
            ))
        })
    })
    test("All effects starts with their character name", () => {
        Object.values(list).forEach(generator => {
            generator.Effects.forEach(ef => (
                expect(ef.Name).toMatch(new RegExp("^" + generator.Name))
            ))
        })
    })
})