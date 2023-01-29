/** array of input arrays to combinate */
export type Arrays = readonly (unknown[])[] | []
/** a single combination between different arrays */
export type Combination<T extends Arrays> = {
    -readonly [P in keyof T]: T[P] extends readonly unknown[] ? T[P][number] : never
}

/**
 * Generates all the combinations for the values of the given arrays.
 * For example, `CombinateGroups([1, 2], [a, b], [x, y])` will generate
 * combinations `[1,a,x], [1,a,y], [1,b,x], ...`.
 * @param values The arrays to combinate, in the form `[ [elements of array 1], [elements of array 2], ...  ]`
 * @returns a generator that yields all combinations one by one
 */
export function* CombinateArrays<T extends Arrays>(...arrays: T) {
    if (arrays.length === 0) {
        yield []
    }
    function* generate(level: number, trail: unknown[]): Generator<unknown[]> {
        for (const item of arrays[level]) {
            const sub = [...trail, item]
            if (level === arrays.length - 1) {
                yield sub
            } else {
                yield* generate(level + 1, sub)
            }
        }
    }

    yield* generate(0, []) as Generator<Combination<T>>
}