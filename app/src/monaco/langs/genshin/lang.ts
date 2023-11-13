import { genshin } from "@src/genshin/core"
import { registerGenshinAutocomplete } from "./autocomplete"
import { registerGenshinHover } from "./hover"
import { registerGenshinTokens } from "./tokens"

export function registerGenshinLang(langName: string, program: genshin.cmd.Program<unknown>) {
    registerGenshinTokens(langName, program)
    registerGenshinAutocomplete(langName, program)
    registerGenshinHover(langName, program)
}