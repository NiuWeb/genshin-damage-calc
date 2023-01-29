/**
 * Adds a value to a list of "active values" keeping a maximum.
 * If adding the value passes the maximum value, then the nearest
 * active value will be removed.
 * @param value Value to insert
 * @param values Current active values
 * @param max Maximum active values
 * @returns New active values
 */
export function activateValue(value: number, values: number[], max?: number): number[] {
    const result = new Set(values)
    if (Number.isFinite(max) && result.size + 1 > (max || 0)) {
        let distance = Infinity
        let remove = -1

        values.forEach(v => {
            const d = Math.abs(v - value)
            if (d < distance) {
                distance = d
                remove = v
            }
        })
        result.delete(remove)
    }
    result.add(value)

    return Array.from(result)
}