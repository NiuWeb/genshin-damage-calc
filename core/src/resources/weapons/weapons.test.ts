import * as list from "./list"

describe("Effects of the registered weapons are correctly configured", () => {
    Object.values(list).forEach(wp => {
        wp.Effects.forEach(ef => {
            test(`Effect ${ef.Name} has MaxRank=5`, () => (
                expect(ef.MaxRank).toBe(5)
            ))
            test(`Effect ${ef.Name} starts with weapon name`, () => (
                expect(ef.Name.startsWith(wp.Name)).toBe(true)
            ))
            test(`Effect ${ef.Name} ends with a number`, () => (
                expect(ef.Name).toMatch(/\d+$/)
            ))
        })
    })
})