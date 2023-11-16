import { Compiler, ExprParser, Program } from "@bygdle/cmdlang"

/**
 * Compiler with extended language functions
 */
export class ExtendedCompiler<Context, Value = void> extends Compiler<Context, Value> {
    constructor(program: Program<Context, Value>) {
        super(program)

        const context = ExprParser.Contexts("math", "logic", {
            functions: {
                pick: {
                    name: "pick",
                    arguments: [
                        { name: "index", description: "integer index of the item to pick, starting at 1" },
                        "..."
                    ],
                    evaluate({ values: [index, ...items] }) {
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
                        parser.setVar(name, value)
                        return value
                    }
                },
                "add": {
                    name: "add",
                    arguments: [
                        { name: "variable", description: "name of the variable to add to", expression: true },
                        { name: "value", description: "value to add to the variable" }
                    ],
                    evaluate: ({ values: [, value], expressions: [nameNode] }) => {
                        const name = nameNode.token.value
                        const current = parser.getVar(name)
                        if (current === undefined) {
                            throw new Error(`Variable ${name} is not defined`)
                        }
                        const result = current + value
                        parser.setVar(name, result)
                        return result
                    }
                },
                "multiply": {
                    name: "multiply",
                    arguments: [
                        { name: "variable", description: "name of the variable to multiply", expression: true },
                        { name: "value", description: "value to multiply the variable by" }
                    ],
                    evaluate: ({ values: [, value], expressions: [nameNode] }) => {
                        const name = nameNode.token.value
                        const current = parser.getVar(name)
                        if (current === undefined) {
                            throw new Error(`Variable ${name} is not defined`)
                        }
                        const result = current * value
                        parser.setVar(name, result)
                        return result
                    }
                },
            }
        })
        const parser = new ExprParser(context)

        this.exprParser = parser
    }
}