import { Program } from "@bygdle/cmdlang"
import { ExtendedCompiler } from "@src/compiler/Compiler"
import { cmd_artifacts } from "./artifacts/artifacts"
import { cmd_pieces } from "./artifacts/pieces"
import { cmd_character } from "./character/character"
import { cmd_effect } from "./effect/effect"
import { cmd_enemy } from "./enemy/enemy"
import { cmd_enka } from "./enka/enka"
import { cmd_food } from "./food/food"
import { cmd_rotation } from "./rotation/rotation"
import { Scenario } from "./scenario"
import { cmd_stat } from "./stat/stat"
import { cmd_state } from "./state/state"
import { cmd_weapon } from "./weapon/weapon"

/** creates a genshin command runner */
export class Runner extends ExtendedCompiler<Scenario, void> {
    public Scenario: Scenario
    /** creates a genshin command runner */
    constructor() {
        const scenario = new Scenario()
        const program = new Program(scenario, {
            "character": {
                name: "character",
                description: "Controls characters in the party",
                children: cmd_character()
            },
            "stat": {
                name: "stat",
                description: "Shortcut for `character stat` subcommands",
                children: cmd_stat()
            },
            "weapon": {
                name: "weapon",
                description: "Controls weapons in the party",
                children: cmd_weapon()
            },
            "effect": {
                name: "effect",
                description: "Controls effects in the party",
                children: cmd_effect()
            },
            "artifact": {
                name: "artifact",
                description: "Controls all the artifacts",
                children: cmd_artifacts()
            },
            ...cmd_pieces(),
            "enemy": {
                name: "enemy",
                description: "Controls all enemies in the party.",
                children: cmd_enemy()
            },
            "food": {
                name: "food",
                description: "Controls food buffs",
                children: cmd_food()
            },
            "rotation": {
                name: "rotation",
                description: "Controls the rotation",
                children: cmd_rotation()
            },
            "reset": {
                name: "reset",
                description: "Resets the scenario to its initial state",
                compile(_, { context, logger }) {
                    return function reset() {
                        context.Reset()
                        logger.warnf("Command `reset` executed.")
                    }
                }
            },
            "state": {
                name: "state",
                description: "Functions to save/load the party state",
                children: cmd_state()
            },
            "enka": {
                name: "enka",
                description: "Imports characters from Enka.Network service",
                children: cmd_enka()
            },
            "echo": {
                name: "echo",
                arguments: "[*=] any...",
                description: "Prints the arguments to the console",
                compile({ parts, expressions }, { logger }) {
                    const line = logger.line
                    return function echo() {
                        const curLine = logger.line
                        logger.setLine(line)

                        const str = parts.map((part, i) => {
                            const expr = expressions[i]
                            if (expr) {
                                const res = expr.evaluateAll()
                                return res.pop()
                            }
                            return part
                        })

                        logger.log(str.join(""))

                        logger.setLine(curLine)
                    }
                }
            },
            "void": {
                name: "void",
                arguments: "[*=] any...",
                description: "Does nothing, can be used to include expression blocks without printing the result",
                example: "void { 1 + 1 }",
                compile({ expressions }) {
                    return function void_() {
                        for (const expr of expressions) {
                            if (!expr) continue
                            expr.evaluateAll()
                        }
                    }
                }
            },
        })

        super(program)
        this.Scenario = scenario
        this.Scenario.SetCompiler(this)

        this.exprParser.context.variables = this.Scenario.VarProxy
        this.exprParser.context.functions = {
            ...this.exprParser.context.functions,
            "foreachcharacter": {
                name: "foreachcharacter",
                description: "Executes the expression for each character in the party. " +
                    "Returns the sum of the results of each expression.",
                arguments: [
                    {
                        name: "expression",
                        description: "expression to evaluate for each character",
                        expression: true,
                    }
                ],
                evaluate: ({ expressions: [expr] }) => {
                    const members = scenario.Party.GetMembers()

                    const char = scenario.Character
                    let reduced = 0
                    for (const member of members) {
                        scenario.SetChar(member)
                        reduced += expr.evaluate?.() ?? 0
                    }
                    scenario.SetChar(char)

                    return reduced

                }
            }
        }
    }

}