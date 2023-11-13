import { Compiler, ExprParser, Program } from "@bygdle/cmdlang"

/**
 * Compiler with extended language functions
 */
export class ExtendedCompiler<Context, Value = void> extends Compiler<Context, Value> {
    constructor(program: Program<Context, Value>) {
        super(program)

        const parser = new ExprParser(
            ExprParser.Contexts("math", "logic", {
                functions: {
                    pick: {
                        name: "pick",
                        arguments: [
                            { name: "index", description: "integer index of the item to pick, starting at 1" },
                            "..."
                        ],
                        evaluate({ values: [index, ...items] }) {
                            console.log("running pick", index, items)
                            return items[index - 1]
                        }
                    },
                    "var": {
                        name: "var",
                        arguments: [
                            { name: "name", description: "name of the variable to set", expression: true },
                            { name: "value", description: "value to set the variable to" }
                        ],
                        evaluate: ({ values: [, value], expressions: [nameNode] }) => {
                            const name = nameNode.token.value
                            console.log(`Setting variable ${name} to ${value}`)
                            parser.setVar(name, value)
                            return value
                        }
                    }
                }
            })
        )

        this.exprParser = parser
    }
}