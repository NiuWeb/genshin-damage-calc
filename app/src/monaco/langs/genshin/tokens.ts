import { genshin } from "@src/genshin/core"
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

                // quote open
                [/"/, {token: "string", next: "@string"}],

                // constants
                [/\$[a-z_](\w)*/, "constant"],

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

                [/@symbols/, "operator"],


                [/\{\x40?/, { token: "delimiter.bracket", next: "exprLang" }],
            ],

            string: [
                [/\{/, { token: "delimiter.bracket", next: "exprLang" }],
                [/"/, { token: "string", next: "@pop" }],
                [/[^"{]+/, "string"],
            ],

            exprLang: [
                [/(#|\/\/).*/, "comment"],

                { include: "@whitespace" },
                [/\}/, { token: "delimiter.bracket", next: "@pop" }],

                // function
                [/[a-z_]\w*(?=\()/, "function"],

                [/\$[a-z_](\w)*/, "constant"],
                [/[a-z_](\w)*/, "variable"],

                // numbers
                [/[0-9]+(?:\.[0-9]+)?e(?:\+|-)?[0-9]+(?:\.[0-9]+)?/, "number"],
                [/[0-9]+(?:\.[0-9]+)?/, "number"],

                [/@exprSymbols/, "operator"],
            ],

            comment: [
                [/\x40[a-z][a-z0-9_]*:?/, "keyword"],
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
        symbols: /=|<|>/,

        exprSymbols: /[+\-*/()=<>%]/,
    })
}