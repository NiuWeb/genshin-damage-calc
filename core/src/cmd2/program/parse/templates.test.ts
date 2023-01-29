import { ParseLines } from "./line"
import { FindTemplates } from "./template"

describe("Find template blocks", () => {
    test("a", () => {

        FindTemplates(ParseLines(`
            nothing important
            do something and @here uwu {
                inner block {
                inner code
                }
            }
            also somethins { inline {another important} }
            not here
        `))

    })
})