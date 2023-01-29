import { Line } from "./type"

/**
 * Converts a line into a list of command parts
 * @param text line to parse
 */
export function ParseLine(text: string): string[] {
    return text
        .trim()
        .split(/\s+/)
        .filter(s => !s.match(/^\s*$/))
}
/**
 * Parses a multi-line text into a list of lines
 */
export function ParseLines(text: string): Line[] {
    return text
        .split("\n")
        .map((text, line) => ({ text, line }))
        .filter(({ text }) => text.trim() !== "")
}