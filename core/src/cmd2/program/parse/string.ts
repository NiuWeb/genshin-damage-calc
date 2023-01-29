import { Logger } from "@src/cmd2/logger"
import { CompileStringOptions } from "@src/cmd2/type"
import { RemoveComments } from "./comments"
import { FindConstants, ReplaceConstants } from "./constants"
import { ParseLine, ParseLines } from "./line"
import { Parsed } from "./type"

/**
 * Parses a multi-line string into an array of pairs `{command, line}`.
 * @param input String to parse
 * @param log logger to put messages in
 */
export function ParseString(input: string, opts: CompileStringOptions = {}, log = Logger.Global): Parsed[] {
    const result: Parsed[] = []

    input = RemoveComments(input)
    const [cmd, constants] = FindConstants(input, opts?.constants)

    const initLine = log.Line
    const lines = ParseLines(cmd)
    lines.forEach(({ text, line }) => {
        log.Line = line + 1
        try {
            text = ReplaceConstants(text, constants)
        } catch (e) {
            log.Error(String(e).valueOf())
            log.Line = initLine
            throw e
        }
        const parts = ParseLine(text)
        if (!parts.length) {
            return
        }
        result.push({ cmd: parts, line: log.Line })
    })
    log.Line = initLine
    return result
}