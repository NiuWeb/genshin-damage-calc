import { genshin } from "@src/genshin/core"
import { getGroups } from "./data"
import * as monaco from "monaco-editor"


export function registerGenshinAutocomplete(langName: string, program: genshin.cmd2.Program<unknown>) {
    const { suggestions } = getGroups(program)

    monaco.languages.registerCompletionItemProvider(langName, {
        provideCompletionItems(model, position) {
            const word = model.getWordUntilPosition(position)
            const start = model.getValueInRange({
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn - 1,
                endColumn: word.startColumn
            })
            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
            }

            if (start === "$") {
                const [, constants] = genshin.cmd2.FindConstants(model.getValue())
                const keys = Object.keys(constants)
                return {
                    suggestions: keys.map((label) => ({
                        label,
                        insertText: label,
                        kind: monaco.languages.CompletionItemKind.Constant,
                        range
                    }))
                }
            } else return {
                suggestions: suggestions.map(label => ({
                    label,
                    insertText: label,
                    kind: monaco.languages.CompletionItemKind.Value,
                    range
                }))
            }
        },
    })
}