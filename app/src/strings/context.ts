import { createContext, useContext, useReducer } from "react"
import { SetLanguage } from "./strings"

export type LanguageContext = typeof SetLanguage
export const LanguageContext = createContext(undefined as unknown as LanguageContext)

/** returns getter and setter for language strings */
export function useLanguage() {
    return useContext(LanguageContext)
}
/** creates the context provider for language */
export function useLanguageProvider(): LanguageContext {
    const [, update] = useReducer(x => (x + 1) % 7, 0)
    return (lang: string) => {
        SetLanguage(lang)
        update()
    }
}