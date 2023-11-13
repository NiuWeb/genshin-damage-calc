import { genshin } from "@bygdle/genshin-calculator-core"
import * as monaco from "monaco-editor"
import { getGroups } from "./data"

export function registerGenshinTokens(langName: string, program: genshin.cmd.Program<unknown>) {
    const { groups } = getGroups(program)

    // Register a tokens provider for the language
    monaco.languages.setMonarchTokensProvider(langName, {
        ignoreCase: true,
        tokenizer: {
            root: [
                // comments starts with # or //
                [/(#|\/\/).*/, "comment"],

                // variables
                [/\$[a-z_](\w)*/, "variable"],

                // whitespace
                { include: "@whitespace" },
                // single words
                [/[a-z_]\w*/, {
                    cases: {
                        "@keywords": "keyword",
                        "@characters": "resource",
                        "@weapons": "resource",
                        "@sets": "resource",
                        "@foods": "resource",
                        "@effects": "effect",
                        "@stats": "stat",
                        "@auras": "stat",
                        "@commands": "command",
                    }
                }],

                // numbers can accept percentages and start with "x"
                [/x?[0-9]+(?:\.[0-9]+)?%?/, "number"],

                [/@symbols/, "operator"]
            ],

            comment: [
                [/[^/*]+/, "comment"],
                [/\/\*/, "comment", "@push"],    // nested comment
                ["\\*/", "comment", "@pop"],
                [/[/*]/, "comment"]
            ],
            whitespace: [
                [/[ \t\r\n]+/, "white"],
                [/\/\*/, "comment", "@comment"],
                [/\/\/.*$/, "comment"],
            ],
        },
        ...groups,

        keywords: ["const", "case", "all", "none", "help"],
        symbols: /=|<|>/
    })
}