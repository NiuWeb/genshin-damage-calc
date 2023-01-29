/** Groups the results of a generator into chunks (arrays) */
export function* GenerateChunks<Value>(chunkSize: number, generator: Generator<Value, void, void>) {
    let results: Value[] = []
    for (const result of generator) {
        results.push(result)
        if (results.length >= chunkSize) {
            yield results
            results = []
        }
    }
    if (results.length > 0) {
        yield results
    }
}