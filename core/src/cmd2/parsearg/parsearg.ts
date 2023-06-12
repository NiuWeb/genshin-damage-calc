
export interface ParsedArg {
    name: string
    value: string[]
}

/**
 * Parses an argumen in one of the following formats:
 * - `arg=value`
 * - `arg=value1,value2,value3`
 * - `arg=min:max`: only for numeric values
 * - `arg=min:max:step`: only for numeric values
 * If no = is found, the parsed name will be an empty string.
 * The argument value will always be an array of strings.
 * @returns a map of argument names to their values
 */
export function parseArgsmap(args: string[]): Map<string, string[]> {
    const argsmap = new Map<string, string[]>()
    for (const arg of args) {
        const parsed = parseArg(arg)
        argsmap.set(parsed.name, parsed.value)
    }
    return argsmap
}

/**
 * Parses an argumen in one of the following formats:
 * - `arg=value`
 * - `arg=value1,value2,value3`
 * - `arg=min:max`: only for numeric values
 * - `arg=min:max:step`: only for numeric values
 * If no = is found, the parsed name will be an empty string.
 * The argument value will always be an array of strings.
 */
export function parseArg(arg: string): ParsedArg {
    const parts = arg.split("=")
    const name = parts.shift() || ""
    const strval = parts.join("=")

    if (parts.length === 0) return { name: "", value: [name] }

    const value: string[] = []
    const values = strval.split(",")

    for (const val of values) {
        if (val.includes(":")) {
            value.push(...parseArgRange(val))
        } else {
            value.push(val)
        }
    }

    return { name, value }
}

/**
 * Creates a range of numeric arguments based on a range in the following format:
 * - `min:max`: inclusive both min and max
 * - `min:max:step`: inclusive both min and max, with a step
 */
function parseArgRange(arg: string): string[] {
    const range = arg.split(":")
    if (range.length === 1) return range

    if (range.length > 3) {
        throw new Error(`Invalid argument range: ${arg} has more than 3 values (min:max:step)`)
    }

    const [min, max, _step] = range

    const step = parseInt(_step ?? 1)
    const minval = parseInt(min)
    const maxval = parseInt(max)

    if (!Number.isFinite(minval) || !Number.isFinite(maxval) || !Number.isFinite(step)) {
        throw new Error(`Invalid argument range: ${arg} has non-numeric values`)
    }

    if (minval > maxval) {
        throw new Error(`Invalid argument range: ${arg} has min > max`)
    }

    if (step <= 0) {
        throw new Error(`Invalid argument range: ${arg} has step <= 0`)
    }

    const values: string[] = []
    for (let i = minval; i <= maxval; i += step) {
        values.push(i.toString())
    }

    return values
}