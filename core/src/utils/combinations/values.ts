/**
 * Generates all possible combinations of N values from the given array.
 * Without repetition.
 * @param values Array of values
 * @param size Number of values to combine
 */
export function* CombinateValues<T>(values: T[], size: number) {

    function* combinateValues(values: T[], index: number, current: T[]): Generator<T[]> {
        if (current.length === size) {
            yield current
        }

        for (let i = index; i < values.length; i++) {
            const value = values[i]
            yield* combinateValues(values, i + 1, [...current, value])
        }
    }

    yield* combinateValues(values, 0, [])
}