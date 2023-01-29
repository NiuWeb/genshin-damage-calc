import * as monaco from "monaco-editor"

// Define a new theme that contains only rules that match this language
monaco.editor.defineTheme("genshin-cmd-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [
        { token: "comment", foreground: "939393" },
        { token: "resource", foreground: "f38036" },
        { token: "effect", foreground: "a0bf3a" },
        { token: "stat", foreground: "cca029" },
        { token: "variable", foreground: "45b4f4" },
        { token: "operator", foreground: "ff7b72" },
        { token: "command", foreground: "eb5fb4" },
    ],
    colors: {}
})