import { Logger } from "@src/cmd2"
import { Optimizer } from "@src/optimizer/optimizer"
import { OptimizerConfig } from "@src/optimizer/type"
import { BackendAction } from "@src/worker/action"
import { FromWorker, WORKER_PATHS, Register, ToChildWorker, ToWorker, SetThreadType, THREAD_TYPE } from "./config"

/**
 * The child workers will recieve a "fragment" of the
 * total rows to evaluate, called a chunk.
 * 
 * Once the chunk is evaluated, the child worker will
 * return the result but won't be terminated. Instead,
 * it will wait for another chunk to evaluate.
 */
export class OptimizerChildBackend extends BackendAction<ToChildWorker, FromWorker> {
    constructor() {
        super({
            [WORKER_PATHS.BACKEND_CHILD_RUN + "/init"]: (id, data) => this.Init(id, data),
            [WORKER_PATHS.BACKEND_CHILD_RUN + "/run"]: (id, data) => this.Run(id, data)
        })
    }

    optimizer?: Optimizer<unknown, unknown, OptimizerConfig>

    Init(id: string, data: ToWorker): void {
        SetThreadType(THREAD_TYPE.CHILD_WORKER)

        // disable logs
        Logger.Global.SaveLogs = false
        Logger.Global.Out = () => void 0

        // initialize the requested optimizer
        const optimizer = this.optimizer = new Register[data.tool]()
        optimizer.Init(data.config as never)

        // send initialization message to main worker
        console.log("[CHILD WORKER] Child worker initialized")
        this.Post(WORKER_PATHS.FRONTEND_CHILD_RUN + "/init", { id } as FromWorker)
    }

    Run(id: string, data: ToChildWorker) {
        // check if the optimizer is initialized
        if (!this.optimizer) {
            throw new Error("[CHILD WORKER] Optimizer not set in the child worker")
        }

        // evaluate the rows
        for (const row of data.rows) {
            this.optimizer.Insert(this.optimizer.Evaluate(row))
        }

        // send the result to the main thread
        const result = this.optimizer.Get() as FromWorker["result"]
        this.Post(WORKER_PATHS.FRONTEND_CHILD_RUN + "/run", {
            id,
            result,
        })
    }
}