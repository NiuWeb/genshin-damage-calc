import { FrontendAction } from "@src/worker/action"
import { FromWorker, WORKER_PATHS, Register, ToWorker } from "./config"


export type OptimizerKey = keyof Register
export type OptimizerConfig<Tool extends OptimizerKey> = ToWorker<Tool>["config"]
export type OptimizerResult<Tool extends OptimizerKey> = FromWorker<Tool>["result"]
export type OptimizerTransform<Tool extends OptimizerKey> = FromWorker<Tool>["transform"]

/**
 * The optimizer client is meant to run in the main thread,
 * and will spawn a single worker (the main worker) that
 * will spawn a number of child workers.
 */
export class Optimizer extends FrontendAction<FromWorker, ToWorker> {

    Children = 1
    Chunk = 100

    /** Triggers when the worker sends a progress message */
    OnProgress: (current: number, total: number) => void = () => void 0

    /**
     * Runs the optimizer worker.
     * @param tool The name of the optimizer to execute
     * @param config The tool-specific configuration object
     * @returns a promise that resolves with the final optimizer result
     */
    Run<Tool extends keyof Register>(tool: Tool, config: ToWorker<Tool>["config"]): Promise<{
        result: FromWorker<Tool>["result"],
        transform?: FromWorker<Tool>["transform"],
        formatted?: FromWorker<Tool>["formatted"]
    }> {
        console.log("[CLIENT] Running optimizer worker for tool: " + tool)
        return new Promise<{
            result: FromWorker<Tool>["result"],
            transform?: FromWorker<Tool>["transform"],
            formatted?: FromWorker<Tool>["formatted"]
        }>((resolve, reject) => {
            // send the optimization request to the worker
            const id1 = this.worker.Post(WORKER_PATHS.BACKEND_RUN, {
                tool, config,
                children: this.Children,
                chunk: this.Chunk
            })

            // listen for the result
            const listener = this.worker.AddListener(WORKER_PATHS.FRONTEND_RUN,
                (_, { id, result, transform, formatted, progress, total }) => {
                    if (id !== id1) {
                        if (id === "progress:" + id1 && Number.isFinite(progress) && Number.isFinite(total)) {
                            this.OnProgress(progress || 0, total || 0)
                        }
                        return
                    }
                    resolve({
                        result: result as FromWorker<Tool>["result"],
                        transform: transform as FromWorker<Tool>["transform"],
                        formatted: formatted as FromWorker<Tool>["formatted"]
                    })
                    this.worker.RemoveListener(listener)
                })

            // listen for errors
            const errListener = this.worker.AddErrorListener((error) => {
                this.worker.RemoveErrorListener(errListener)
                reject(error)
            })
        })
    }
}