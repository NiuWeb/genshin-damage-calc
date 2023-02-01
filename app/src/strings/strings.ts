import EN from "./en.json"
import ES from "./es.json"

type LangKey = keyof typeof EN


export interface LangEntry {
    title: string
    description?: string | string[]
}

export type Lang = {
    [key: string]: string | string[] | LangEntry
}

export type Langs = {
    [lang: string]: Lang
}

const langs: Langs = { EN, ES }
let language = langs.EN

/** Sets the app language */
export function SetLanguage(lang: string): void {
    if (!(lang in langs)) {
        throw new Error("Unknown language: " + lang)
    }
    language = langs[lang]
}
/** Gets the list of known languages */
export function GetLanguages(): string[] {
    return Object.keys(langs)
}
/** gets the current language */
export function GetLanguage(): string {
    const entries = Object.entries(langs)
        .find(([, obj]) => obj === language)

    return entries?.[0] || "EN"
}

/** Checks if a key exists in the current language */
export function HasKey(key: string): boolean {
    return key in language
}

/** 
 * Finds a key that contains the given string in any language 
 * @param string the string content to search for
 * @param ignoreCase Whether to search as case-insensitive (default false)
 */
export function FindKey(string: string, ignoreCase = false): string | undefined {
    if (ignoreCase) {
        string = string.toLowerCase()
    }

    for (const lang in langs) {
        const obj = langs[lang]
        for (const key in obj) {
            let content = entryToString(key, obj[key]).trim()
            if (ignoreCase) {
                content = content.toLowerCase()
            }
            if (content === string) {
                return key
            }
        }
    }

    return undefined
}

/** Gets a string in the current language */
export function GetString(string: LangKey, options?: StringOptions): string
export function GetString(string: string, options?: StringOptions): string
export function GetString(string: string, options: StringOptions = {}): string {
    const entry = language[string] || `{{${string}}}`

    let value = entryToString(string, entry, options.description)

    const { vars, templates } = options
    if (vars) {
        for (const varname in vars) {
            const varvalue = String(vars[varname]).valueOf()
            value = value.replaceAll("@" + varname, varvalue)
        }
    }

    if (templates) {
        for (const tempname in templates) {
            const exp = new RegExp(`#${tempname}\\{([^}]+)\\}`, "g")
            value = value.replace(exp, (_, group: string) => {
                const parts = group.split("|")
                return parts[templates[tempname] - 1]
            })
        }
    }

    return value
}

/**
 * 
 * @param key Key to use as default if description was requested but not found. 
 * It will return `{{key:description}}`
 * @param entry The entry to convert to string
 * @param description Whether to return the entry description (true) or the title (false). Default false
 * @returns entry converted to string
 */
function entryToString(key: string, entry: string | string[] | LangEntry, description?: boolean): string {
    if (typeof entry === "string") {
        return entry
    } else if (Array.isArray(entry)) {
        return entry.join(" ")
    } else if (!description) {
        return entry.title
    } else {
        const desc = entry.description || `{{${key}:description}}`
        if (typeof desc === "string") {
            return desc
        } else {
            return desc.join(" ")
        }
    }
}

export interface StringOptions {
    /** whether to return the entry description, or the title */
    description?: boolean
    /** replace variables in the form `@varname` in the string with the provided values */
    vars?: {
        [variable: string]: string | number | undefined
    }
    /**
     * Replace template variables in the form `#tempname{value1|value2|...}`
     * with the provided values
     */
    templates?: {
        [template: string]: number
    }
}