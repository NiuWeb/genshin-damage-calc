import Colors from "ansi-colors"
import { Log, LogType } from "./type"
Colors.enabled = true

type Colors = typeof Colors
type MethodsObj = {
    [k in keyof Colors]: Colors[k] extends (s: string) => string ? k : never
}
type Methods = MethodsObj[keyof MethodsObj]

const typeColors: { [type in LogType]: Methods } = {
    "Log": "green",
    "Warn": "yellow",
    "Error": "red"
}
/**
 * Converts a log message to a string
 * @param prefix Include a prefix in the form `[Line X] [STATUS]` at the start
 * @param colorize Whether to colorize the prefix (if prefix=true)
 * @param log Log to convert
 */
export function LogString(prefix: boolean, colorize: boolean, log: Log): string {
    let result = log.msg
    if (prefix) {
        let prefix = `[Line ${log.line}] [${log.type}]`
        if (colorize) {
            prefix = Colors[typeColors[log.type]](prefix)
        }
        result = prefix + " " + result
    }
    return result
}

/**
 * Adds a color to the argument wildcards in a format string.
 * For example:
 * ```
 * ColorizeArgs("green", "argument1: %s, count: %d")
 * ```
 * The wildcards `%s` and `%d` will be surrounded by an ANSI color tag
 * @param method Method to use to colorize
 * @param format The format string
 * @returns Colorized format string
 */
export function ColorizeArgs(method: Methods, format: string): string {
    return format.replace(/%([.0-9]*[a-z]+)/g, (substr) => (
        Colors[method](substr)
    ))
}