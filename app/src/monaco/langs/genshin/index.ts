import * as monaco from "monaco-editor"
import { registerGenshinLang } from "./lang"
import { Calc } from "@src/genshin/calc"
import "./theme"
import { genshin } from "@src/genshin/core"

monaco.languages.register({ id: "genshin-cmd" })
monaco.languages.register({ id: "genshin-cmd-general-optimizer" })
monaco.languages.register({ id: "genshin-cmd-upgrades-optimizer" })

registerGenshinLang("genshin-cmd", Calc.Get().program)
registerGenshinLang("genshin-cmd-general-optimizer", new genshin.optimizer.general.CombinatorCmd().program)
registerGenshinLang("genshin-cmd-upgrades-optimizer", new genshin.optimizer.upgrades.ResourceCmd().program)
