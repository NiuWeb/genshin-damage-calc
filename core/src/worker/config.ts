import { VirtualWorker } from "./worker"

let backendGenerator: (() => VirtualWorker<unknown, unknown>) | undefined = undefined

/**
 * Changes the function that generates a backend worker from a frontend thread
 */
export function SetGenerator(generator: () => VirtualWorker<unknown, unknown>): void { 
    backendGenerator = generator
}
/**
 * Generates a backend worker from a frontend thread
 */
export function Generate(): VirtualWorker<unknown, unknown> {
    if (!backendGenerator) {
        throw new Error("No backend worker generator is defined")
    }
    return backendGenerator()
}