/**
 * A list of stats
 */
export type StatList<Keys extends string> = {
    readonly [key in Keys]: number
} & {
    /** Checks if the list has a given name */
    Has(name: string): boolean
    /**
     * Gets a stat by its name. Throws an exception if the name
     * is not found.
     */
    Get(name: string): number
    /**
     * Gets the name of an stat. Throws an exception if the
     * stat is not found
     */
    Name(value: number): string
    /**
     * Gets the numerical values in the list
     */
    Values(): number[]
    /**
     * Gets the number of stats in the list
     */
    Length(): number
}

/**
 * Creates a stat list
 */
export function StatList<Keys extends string>(...keys: Keys[]): StatList<Keys> {
    const result = {} as { [k in Keys]: number }
    const names: { [x: number]: string } = {}
    let index = 0
    for (const key of keys) {
        result[key] = index
        names[index] = key
        index++
    }

    return {
        ...result,
        Get(name) {
            const value = result[name as Keys]
            if (value === undefined) {
                throw new Error(`Stat not found: ${name}`)
            }
            return value
        },
        Name(value) {
            const name = names[value]
            if (name === undefined) {
                throw new Error(`Stat not found: ${value}`)
            }
            return name
        },
        Has(value) {
            return Object.keys(result).includes(value)
        },
        Values() {
            return Object.values(result)
        },
        Length() {
            return keys.length
        },
    }
}