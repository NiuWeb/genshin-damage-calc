import { RemoveComments } from "./comments"
import { DEFINE_CASE_EXP } from "./expr"

/**
 * Split a command string into multiple cases in the form:
 * ```
 * case value1:
 * ...code
 * case value2, value3, ..., valueN:
 * ...code
 * ```
 * For which it will generate a map of cases like this:
 * ```
 * [value1]: code
 * [value2]: code
 * [...]: code
 * ```
 * @param text String to split
 * @returns map of cases
 */
export function SplitCases(text: string): Map<string, string[]> {
    text = RemoveComments(text)
    const result = new Map<string, string[]>()
    const matches = Array.from(text.matchAll(DEFINE_CASE_EXP))

    matches.forEach((match, i) => {
        const head = match[0]
        const value = match[1]
        if (!head || !value) { return }

        const cases = value
            .split(/\s|,|;/)
            .map(v => v.trim())
            .filter(v => !!v)

        // get a substring from the end of the case head to the begin of the next case
        const from = (match.index || 0) + head.length
        const to = matches[i + 1]?.index || text.length
        const body =
            text.slice(0, from).replace(/[^\n]/g, "") + // keep line breaks
            text.slice(from, to).trim() +
            text.slice(to, text.length).replace(/[^\n]/g, "") // keep line breaks

        // add to the cases map
        for (let c of cases) {
            c = c.toLowerCase() // all cases to lowercase
            let arr = result.get(c)
            if (!arr) {
                result.set(c, arr = [])
            }
            arr.push(body)
        }
    })
    // copy the case "all" to all cases
    const all = result.get("all")
    if (all) {
        for (const r of result.values()) {
            r.unshift(...all)
        }
    }

    return result
}