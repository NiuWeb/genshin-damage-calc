import { Compiler, ExprParser, Program } from "@bygdle/cmdlang"

interface fnmap {
    args: string[]
    expr: (() => number)[]
}

/**
 * Compiler with extended language functions
 */
export class ExtendedCompiler<Context, Value = void> extends Compiler<Context, Value> {

    private functions = new Map<string, fnmap>()

    constructor(program: Program<Context, Value>) {
        super(program)

        const context = ExprParser.Contexts("math", "logic", {
            functions: {
                "pick": {
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
                    evaluate: ({ values: [, value], expressions: [nameNode], location }) => {
                        const name = nameNode.token.value
                        const current = parser.getVar(name)
                        if (current === undefined) {
                            throw new Error(`Variable ${name} is not defined at ${location}`)
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
                "func": {
                    name: "func",
                    description: "define a function. Example: function(myfunc, (arg1, arg2), (arg1 + arg2))",
                    arguments: [
                        { name: "name", description: "name of the function to define", expression: true },
                        { name: "arguments", description: "arguments to the function", expression: true },
                        { name: "body", description: "body of the function", expression: true }
                    ],
                    evaluate: ({ expressions: [nameNode, argsNode, bodyNode], location }) => {
                        const name = nameNode.token.value
                        const args = argsNode.children.length ?
                            argsNode.children.map(({ token }) => token.value) :
                            (
                                argsNode.token.value === "0" ? [] : [argsNode.token.value]
                            )

                        const expr = (() => {
                            if (bodyNode.evaluate) {
                                return [bodyNode.evaluate]
                            }

                            return bodyNode.children.map(node => node.evaluate || (() => 0))
                        })()

                        if (!expr) throw new Error(`Function body is not an expression at ${location}`)

                        this.functions.set(name, { args, expr })
                        return 0
                    }
                },
                "call": {
                    name: "call",
                    description: "call a function. Example: call(myfunc, arg1, arg2)",
                    arguments: [
                        { name: "name", description: "name of the function to call", expression: true },
                        "..."
                    ],
                    evaluate: ({ expressions: [nameNode], values: [, ...values], location }) => {
                        const name = nameNode.token.value
                        const parts = this.functions.get(name)
                        if (!parts) throw new Error(`Function ${name} is not defined at ${location}`)

                        if (values.length !== parts.args.length) {
                            throw new Error(`Function ${name} expects ${parts.args.length} arguments, but ${values.length} were provided at ${location}`)
                        }

                        for (let i = 0; i < values.length; i++) {
                            parser.setVar(parts.args[i], values[i])
                        }

                        return parts.expr.map(expr => expr()).pop() ?? 0
                    }
                },
            }
        })
        context.ignoreCase = true

        const parser = new ExprParser(context)

        this.exprParser = parser
    }
}