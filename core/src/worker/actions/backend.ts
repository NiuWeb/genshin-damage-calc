import { BackendAction } from "../action"
import { VirtualWorker, WorkerPoster } from "../worker"
import { OptimizerBackend } from "./optimizer/backend"
import { OptimizerChildBackend } from "./optimizer/backend-child"
import { RotationDamageBackend } from "./rotation-damage/backend"

const backendActions = [
    RotationDamageBackend,
    OptimizerBackend,
    OptimizerChildBackend
]

/** Creates a worker to be executed in the backend, with all the registered actions */
export function BackendWorker(poster: WorkerPoster<unknown>): VirtualWorker<unknown, unknown> {
    const worker = new VirtualWorker(poster)

    for (const action of backendActions) {
        const instance = new action()
        type workerType = (typeof instance) extends BackendAction<infer A, infer B> ? VirtualWorker<A, B> : never
        instance.SetWorker(worker as workerType)
    }

    return worker
}