import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { getGroups, groupLabels } from "./data"
import * as monaco from "monaco-editor"

export function registerGenshinHover(langName: string, program: genshin.cmd.Program<unknown>) {
    const docs = new genshin.cmd.ProgramDocs(program)
    const fullCommands = docs.allCommands()

    const { findGroup } = getGroups(program)

    monaco.languages.registerHoverProvider(langName, {
        provideHover(model, position) {
            const word = model.getWordAtPosition(position)
            if (!word) {
                return undefined
            }

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
                const help = docs.markdown(cmd) || ""
                return {
                    range: cmdRange,
                    contents: [
                        {
                            value: help.replace(/^\t+/gm, "")
                        }
                    ]
                }
            } else {
                const group = findGroup(word.word)
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
        },
    })
}