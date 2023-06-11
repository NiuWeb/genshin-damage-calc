/**
 * Concats multiple generators into one
 */
export function* ConcatGenerators<T>(...generators: Generator<T>[]) {
    for (const generator of generators) {
        yield* generator
    }
}