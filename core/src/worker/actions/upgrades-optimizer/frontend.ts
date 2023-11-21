import { Config, Result } from "@src/optimizer/upgrades"
import { FrontendAction } from "@src/worker/action"
import { FromWorker, paths } from "./config"

export class UpgradesOptimizer extends FrontendAction<FromWorker, Config> {

    public OnProgress: (progress?: number, total?: number) => void = () => void 0

    Run(config: Config): Promise<Result[][]> {
        return new Promise<Result[][]>((resolve, reject) => {
            const id1 = this.worker.Post(paths.BACKEND_RUN, config)
            const listener = this.worker.AddListener(paths.FRONTEND_RUN, (_, { id, progress, total, result }) => {
                if (id !== id1) { return }
                if (Number.isFinite(progress)) {
                    this.OnProgress(progress, total)
                }
                if (result) {
                    resolve(result)
                    this.worker.RemoveListener(listener)
                }
            })
            const errListener = this.worker.AddErrorListener((error) => {
                this.worker.RemoveErrorListener(errListener)
                reject(error)
            })
        })
    }

    
}