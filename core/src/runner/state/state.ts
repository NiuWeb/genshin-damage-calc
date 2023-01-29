import { charbox } from "@src/core"
import { store } from "@src/store"
import { RunnerCmd } from "../cmd"

export const cmd_state = RunnerCmd(() => ({
    "save": {
        description: "Saves the current party state.",
        arguments: [],
        compile({ Value, Log }) {
            return function state_save() {
                Value.State = charbox.ExportParty(Value.Party)
                Log.Log("State saved")
            }
        }
    },
    "load": {
        description: "Loads a previously saved party state.",
        arguments: [],
        compile(program) {
            const { Value, Log } = program
            return function state_load() {
                if (!Value.State) {
                    Log.Error("No state saved")
                    return
                }
                Value.Party = store.PartyFrom(Value.State)
                const member = Value.Party.GetMembers()[0]
                const name = member ? member.GetCharacter().Options.Name : undefined

                program.Compile(["character", "unset"], { line: Log.Line })()
                program.Compile(["effect", "unset"], { line: Log.Line })()
                if (name) {
                    program.Compile(["character", "set", name], { line: Log.Line })()
                }
                Log.Log("Party loaded from saved state")
            }
        }
    },
    "clear": {
        description: "Removes the saved state",
        arguments: [],
        compile({ Value, Log }) {
            return function state_clear() {
                Value.State = undefined
                Log.Log("State cleared")
            }
        }
    },

    "b64": {
        description: "Exports/imports party state as base64 strings",
        children: {
            "export": {
                description: "Exports party state as a base64 string.",
                arguments: [],
                compile({ Value, Log }) {
                    return function state_b64_export() {
                        if (!Value.State) {
                            Log.Error("No state saved")
                            return
                        }
                        const str = btoa(JSON.stringify(Value.State))
                        Log.Log(str)
                    }
                }
            },
            "import": {
                description: "Imports party state from a base64 string.",
                arguments: ["base64-string"],
                compile(program, [b64]) {
                    const { Value, Log } = program
                    const data = JSON.parse(atob(b64))
                    return function state_b64_import() {
                        Value.State = data
                        program.Compile(["state", "load"], { line: Log.Line })()
                    }
                }
            }
        }
    }
}))