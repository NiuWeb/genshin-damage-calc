import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { Calc } from "@src/genshin/calc"
import { FindGroup, fullCommands, groupLabels } from "./data"
import * as monaco from "monaco-editor"

const Program = Calc.Get().Program

// Register hover provider
monaco.languages.registerHoverProvider("genshin-cmd", {
    provideHover(model, position) {
        const word = model.getWordAtPosition(position)
        if (!word) {
            return undefined
        }

        const start = model.getValueInRange({
            startLineNumber: position.lineNumber,
            endLineNumber: position.lineNumber,
            startColumn: word.startColumn - 1,
            endColumn: word.startColumn
        })
        if (start === "$") {
            const [, constants] = genshin.cmd2.FindConstants(model.getValue())
            const value = constants[word.word.toLowerCase()]
            if (!value) {
                return undefined
            }
            return {
                range: {
                    startLineNumber: position.lineNumber,
                    endLineNumber: position.lineNumber,
                    startColumn: word.startColumn,
                    endColumn: word.endColumn
                },
                contents: [
                    { value: "**" + GetString("LABEL.CONSTANT") + "**: `" + word.word + "`" },
                    { value: "**" + GetString("LABEL.VALUE") + "**: `" + value + "`" }
                ]
            }
        } else {
            const cmdRange = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: 1,
                endColumn: word.endColumn
            }
            // try with full command
            let cmd = model.getValueInRange(cmdRange)
                .replace(/\s+/g, " ")
                .trim()

            if (cmd.startsWith("rotation do") && cmd !== "rotation do") {
                cmd = cmd.replace(/^rotation do/, "")
                    .replace(/\s+/g, " ")
                    .trim()
            }
            if (fullCommands.includes(cmd)) {
                const help = Program.Help(cmd.split(" ")) || ""
                return {
                    range: cmdRange,
                    contents: [
                        {
                            value: help.replace(/^\t+/gm, "")
                        }
                    ]
                }
            } else {
                const group = FindGroup(word.word)
                if (!group) {
                    return undefined
                }
                const description = (() => {
                    if (group === "effects") {
                        const ef = genshin.effects.FindByName(word.word)
                        if (ef) {
                            const json = JSON.stringify(ef.Options, null, 2)
                            return (
                                "**" + GetString("ITEM." + ef.Name) + "**\n\n" +
                                GetString("ITEM." + ef.Name, { description: true }) + "\n" +
                                "```json\n" + json + "\n```"
                            )
                        }
                    }
                    return GetString("LABEL.DESCRIPTION_NONE")
                })()
                return {
                    range: {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn
                    },
                    contents: [
                        { value: "**" + GetString(groupLabels[group] || group) + "**: `" + word.word + "`" },
                        { value: description }
                    ]
                }
            }
        }
    },
})