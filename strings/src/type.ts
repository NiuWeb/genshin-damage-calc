/** a single entry with title and description */
export interface LangEntry {
    title: string
    description?: string | string[]
}

/** a list of entries for a single language */
export type Lang = {
    [key: string]: string | string[] | LangEntry
}
/** list of entries for multiple languages */
export type Langs = {
    [lang: string]: Lang
}

/** configure string output */
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