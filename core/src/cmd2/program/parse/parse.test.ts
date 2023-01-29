import { ParseString } from "./string"

describe("Parse a string into commands", () => {
    const parsed = ParseString(`
        const $name pepito // constant name
        /** multi-line
         * comment goes
         * here */
        hello $name
        how /* not */ are $x
    `, { constants: { x: "you" } })

    console.log(parsed)

    test("Parsed exactly 2 commands, the other lines should be removed", () => {
        expect(parsed.length).toBe(2)
    })

    test("First command is in the line 6", () => {
        expect(parsed[0].line).toBe(6)
    })
    test("Second command is in the line 7", () => {
        expect(parsed[1].line).toBe(7)
    })
    test("First command is correct", () => {
        expect(parsed[0].cmd.join(" ")).toBe("hello pepito")
    })
    test("Second command is correct", () => {
        expect(parsed[1].cmd.join(" ")).toBe("how are you")
    })
})