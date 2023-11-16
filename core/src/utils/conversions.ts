/** 
 * Converts a string to number throwing an error if conversion fails.
 * Accepts percentage values like `25%`, which equals 0.25.
 */
export function toNumber(strval: string | number): number {
    if (typeof strval === "number") {
        return strval
    }
    const percent = strval.endsWith("%")
    if (percent) {
        strval = strval.slice(0, strval.length - 1)
    }
    let number = parseFloat(strval)
    if (!Number.isFinite(number)) {
        throw new Error(`Invalid number format: "${strval}"`)
    }
    if (percent) {
        number /= 100
    }
    return number
}