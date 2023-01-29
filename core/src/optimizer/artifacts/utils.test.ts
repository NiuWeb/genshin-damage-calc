import { FilterSets } from "./utils"

describe("Filter sets", () => {
    test("Empty config allows no sets", () => (
        expect(FilterSets({}, [])).toBe(true)
    ))
    test("config for 2/4 piece sets doesn't allow no sets", () => (
        expect(FilterSets({
            allowSetNumber: [2, 4]
        }, [])).toBe(false)
    ))
    test("config for 2/4 piece sets allows a 2-piece set", () => (
        expect(FilterSets({
            allowSetNumber: [2, 4]
        }, [["A", 2]])).toBe(true)
    ))
    test("config for 2/4 piece sets allows two 2-piece sets", () => (
        expect(FilterSets({
            allowSetNumber: [2, 4]
        }, [["A", 2], ["B", 2]])).toBe(true)
    ))
    test("config for 2/4 piece sets allows a 4-piece set", () => (
        expect(FilterSets({
            allowSetNumber: [2, 4]
        }, [["A", 4]])).toBe(true)
    ))
    test("config for 2/4 piece sets allows a 4-piece set", () => (
        expect(FilterSets({
            allowSetNumber: [2, 4],
            allowOnly: ["A", "B"]
        }, [["A", 2], ["B", 2]])).toBe(true)
    ))
    test("config for 4 piece sets doesn't allow a 2-piece set", () => (
        expect(FilterSets({
            allowSetNumber: [4]
        }, [["A", 2]])).toBe(false)
    ))
    test("config for 4 piece sets doesn't allow two 2-piece sets", () => (
        expect(FilterSets({
            allowSetNumber: [4]
        }, [["A", 2], ["B", 2]])).toBe(false)
    ))
    test("config for 4 piece sets allows a 4-piece sets", () => (
        expect(FilterSets({
            allowSetNumber: [4]
        }, [["A", 2], ["A", 4]])).toBe(true)
    ))
    test("config for 4 piece sets with specific names doesn't allow any 4-piece sets", () => (
        expect(FilterSets({
            allowSetNumber: [4],
            allowOnly: ["B"]
        }, [["A", 2], ["A", 4]])).toBe(false)
    ))
    test("config for 4 piece sets with specific names allows the same 4-piece sets", () => (
        expect(FilterSets({
            allowSetNumber: [4],
            allowOnly: ["B"]
        }, [["B", 2], ["B", 4]])).toBe(true)
    ))
})