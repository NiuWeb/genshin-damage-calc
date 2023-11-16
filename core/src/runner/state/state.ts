import { charbox } from "@src/core"
import { store } from "@src/store"
import { RunnerCmd } from "../cmd"

export const cmd_state = RunnerCmd(() => ({
    "save": {
        name: "save",
        description: "Saves the current party state.",
        compile(_, { context, logger }) {
            return function state_save() {
                context.State = charbox.ExportParty(context.Party)
                logger.log("State saved")
            }
        }
    },
    "load": {
        name: "load",
        description: "Loads a previously saved party state.",
        compile(_, { context, logger }) {
            return function state_load() {
                if (!context.State) {
                    logger.error("No state saved")
                    return
                }
                context.Party = store.PartyFrom(context.State)
                const member = context.Party.GetMembers()[0]
                const name = member ? member.GetCharacter().Options.Name : undefined

                const line = logger.line
                const compiler = context.GetCompiler()

                compiler.compileString("character unset", { line })()
                compiler.compileString("effect unset", { line })()
                if (name) {
                    compiler.compileString("character set " + name, { line })()
                }
                logger.log("Party loaded from saved state")
            }
        }
    },
    "clear": {
        name: "clear",
        description: "Removes the saved state",
        compile(_, { context, logger }) {
            return function state_clear() {
                context.State = undefined
                logger.log("State cleared")
            }
        }
    },

    "b64": {
        name: "b64",
        description: "Exports/imports party state as base64 strings",
        children: {
            "export": {
                name: "export",
                description: "Exports party state as a base64 string.",
                compile(_, { context, logger }) {
                    return function state_b64_export() {
                        if (!context.State) {
                            logger.error("No state saved")
                            return
                        }
                        const str = btoa(JSON.stringify(context.State))
                        logger.log(str)
                    }
                }
            },
            "import": {
                name: "import",
                description: "Imports party state from a base64 string.",
                arguments: "base64string",
                compile({ values: [b64] }, { context, logger }) {
                    const data = JSON.parse(atob(b64))
                    const line = logger.line
                    return function state_b64_import() {
                        context.State = data
                        context.GetCompiler().compileString("state load", { line })()
                    }
                }
            }
        }
    }
}))