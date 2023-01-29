/**
Generates all possible combinations of N integers subject to the following restrictions:

The sum of all N integers must be T

    `SUM(X_i)=T`

Each integer has a minimum and a maximum value

    `Min_i <= X_i <= Max_i`

@param count The number of integers that must be generated for each combination (N).
@param total The sum of all N integers must equals this value.
@param mins Minimum value for each integer. The length of this array must be N.
@param maxs Maximum value for each integer. The length of this array must be N.

@returns an generator for all the combinations
*/
export function RestrictedInts(count: number, total: number, mins: number[], maxs: number[]): Generator<number[]> {
    const actualTotal = total

    function* generate(combination: number[], total: number, index: number, sum: number): Generator<number[]> {
        let min = 0
        if (index === count - 1) { // the last number must complete the sum
            min = actualTotal - sum
        } else if (index === count) { // the combination is complete
            if (sum === actualTotal) {
                yield combination
            }
            return
        }

        if (mins[index] > min) {
            min = mins[index]
        }

        let max = total
        if (maxs[index] < max) {
            max = maxs[index]
        }

        const subtotal = total - min
        for (let i = min; i <= max; i++) {
            const copy = [...combination, i]
            yield* generate(copy, subtotal, index + 1, sum + i)
        }
    }

    return generate([], actualTotal, 0, 0)
}