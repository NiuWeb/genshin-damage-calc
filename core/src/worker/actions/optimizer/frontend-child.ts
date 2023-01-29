import { FrontendAction } from "@src/worker/action"
import { FromWorker, paths, ToChildWorker } from "./config"

export class OptimizerChild extends FrontendAction<FromWorker, ToChildWorker> {

    /** Initializes the child worker with the given optimizer configuration */
    Init(data: ToChildWorker): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            const id1 = this.worker.Post(paths.BACKEND_CHILD_RUN + "/init", data)
            const listener = this.worker.AddListener(paths.FRONTEND_CHILD_RUN + "/init", (_, { id }) => {
                if (id !== id1) { return }
                resolve()
                this.worker.RemoveListener(listener)
            })
            const errListener = this.worker.AddErrorListener((error) => {
                this.worker.RemoveErrorListener(errListener)
                reject(error)
            })
        })
    }

    /** Sends a chunk of rows to be evaluated by the optiimzer */
    Send(data: ToChildWorker): Promise<FromWorker["result"]> {
        return new Promise<FromWorker["result"]>((resolve, reject) => {
            const id1 = this.worker.Post(paths.BACKEND_CHILD_RUN + "/run", data)
            const listener = this.worker.AddListener(paths.FRONTEND_CHILD_RUN + "/run", (_, { id, result }) => {
                if (id !== id1) { return }
                resolve(result)
                this.worker.RemoveListener(listener)
            })
            const errListener = this.worker.AddErrorListener((error) => {
                this.worker.RemoveErrorListener(errListener)
                reject(error)
            })
        })
    }
}