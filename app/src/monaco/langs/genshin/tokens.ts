import * as monaco from "monaco-editor"
import { groups } from "./data"

// Register a tokens provider for the language
monaco.languages.setMonarchTokensProvider("genshin-cmd", {
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