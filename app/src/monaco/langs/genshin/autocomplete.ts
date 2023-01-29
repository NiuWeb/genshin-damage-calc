import { genshin } from "@src/genshin/core"
import * as monaco from "monaco-editor"
import { suggestions } from "./data"
// Register autocomplete provider
monaco.languages.registerCompletionItemProvider("genshin-cmd", {
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