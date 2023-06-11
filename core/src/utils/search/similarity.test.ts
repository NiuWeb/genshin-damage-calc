import { searchSimilarStrings } from "./similarity"

describe("string search by similarity", () => { 
    test("search the most similar string", () => {
        const search = searchSimilarStrings({
            list: ["engulfing lightning", "enfulgin linting", "engulfasdas"],
            query: "engulfing",
        })

        expect(search).toEqual(["engulfing lightning"])
    })
})