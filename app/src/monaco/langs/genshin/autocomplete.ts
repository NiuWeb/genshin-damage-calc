import { genshin } from "@src/genshin/core"
import { getGroups } from "./data"
import * as monaco from "monaco-editor"

export function registerGenshinAutocomplete(langName: string, program: genshin.cmd.Program<unknown>) {
    const { suggestions } = getGroups(program)

    monaco.languages.registerCompletionItemProvider(langName, {
        provideCompletionItems(model, position) {
            const word = model.getWordUntilPosition(position)
            const range = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: word.startColumn,
                endColumn: word.endColumn
            }

            return {
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