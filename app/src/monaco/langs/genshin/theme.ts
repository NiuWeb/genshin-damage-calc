import * as monaco from "monaco-editor"

monaco.editor.defineTheme("genshin-cmd-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [
        { token: "comment", foreground: "939393" },
        { token: "resource", foreground: "f38036" },
        { token: "effect", foreground: "a0bf3a" },
        { token: "stat", foreground: "cca029" },
        { token: "constant", foreground: "45b4f4" },
        { token: "variable", foreground: "9dd6f3" },
        { token: "operator", foreground: "ff7b72" },
        { token: "command", foreground: "eb5fb4" },
        { token: "delimiter.bracket", foreground: "00ff00" },
        { token: "function", foreground: "dee76c" },
    ],
    colors: {}
})