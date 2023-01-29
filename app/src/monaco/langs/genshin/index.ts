import * as monaco from "monaco-editor"
monaco.languages.register({ id: "genshin-cmd" })

import "./tokens"
import "./autocomplete"
import "./hover"
import "./theme"