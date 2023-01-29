import { SplitCases } from "./cases"
describe("Split code in cases", () => {
    const cases = SplitCases(`
        case value1:
            my code 1
            second line 1
        case value2:
            my code 2
            second line 2
        case value1 value3:
            my code 1 and 3
            second line 1 and 3
        case all:
            all code here
    `)

    test("All cases are registered", () => (
        expect(new Set(cases.keys())).toEqual(new Set(["value1", "value2", "value3", "all"]))
    ))

    test("Value1 has 3 code blocks", () => (
        expect(cases.get("value1")?.length).toBe(3)
    ))

    test("Value1 code blocks are all correct", () => {
        const v = cases.get("value1")!

        expect(trim(v[0])).toBe("all code here")
        expect(trim(v[1])).toBe("my code 1\nsecond line 1")
        expect(trim(v[2])).toBe("my code 1 and 3\nsecond line 1 and 3")
    })
})

function trim(str: string): string {
    return str
        .trim()
        .replace(/\s*\n+\s*/g, "\n")
        .replace(/\n+/g, "\n")
        .replace(/ +/g, " ")
}