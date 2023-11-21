import { BackendAction } from "@src/worker/action"
import { FromWorker, paths } from "./config"
import { Logger } from "@bygdle/cmdlang"
import { Config } from "@src/optimizer/upgrades"
import { UpgradesOptimizer } from "@src/optimizer/upgrades/optimizer2"

export class UpgradesOptimizerBackend extends BackendAction<Config, FromWorker> {
    constructor() {
        super({
            [paths.BACKEND_RUN]: (id, data) => this.Run(id, data)
        })
    }

    Run(id: string, data: Config): void {
        Logger.Global.out = () => void 0
        Logger.Global.save = true

        const optimizer = new UpgradesOptimizer()
        optimizer.Init(data)

        let progress = 0
        this.Post(paths.FRONTEND_RUN, { id, progress })

        for(const row of optimizer.Generate()) {
            const result = optimizer.Evaluate(row)
            optimizer.Insert(result)
            this.Post(paths.FRONTEND_RUN, { id, progress })

            progress++
        }

        const result = optimizer.Get()

        this.Post(paths.FRONTEND_RUN, { id, result })
    }
}