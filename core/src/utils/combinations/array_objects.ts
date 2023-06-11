import { CombinateArrays } from "./arrays"

export type ArrayObject<T> = {
    [K in keyof T]: T[K][]
}

/**
 * Given an object which properties are arrays, returns an array of objects
 * which properties are single values, generating all possible combinations.
 * 
 * For example, given the following object:
 * ```
 * CombinateArrayObjects({
 *   a: [1, 2],
 *   b: [3, 4],
 * })
 * ```
 * The result will be:
 * ```
 * [
 *  { a: 1, b: 3 },
 *  { a: 1, b: 4 },
 *  { a: 2, b: 3 },
 *  { a: 2, b: 4 },
 * ]
 * ```
 */
export function* CombinateArrayObjects<T>(group: ArrayObject<T>) {
    const keys = Object.keys(group) as (keyof T)[]
    const values = keys.map(key => group[key])

    const generator = CombinateArrays(...values)

    for (const combination of generator) {
        const result: Partial<T> = {}

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const value = combination[i]
            result[key] = value
        }

        yield result as T
    }
}