import { charbox } from "@src/core"
import { FrontendAction } from "@src/worker/action"
import { FromWorker, paths, Result, ToWorker } from "./config"

export class RotationDamage extends FrontendAction<FromWorker, ToWorker> {

    Run(party: charbox.Party, command: string): Promise<Result> {
        const exported = charbox.ExportParty(party)
        return new Promise<Result>((resolve, reject) => {
            const id1 = this.worker.Post(paths.BACKEND_RUN, { party: exported, command })
            const listener = this.worker.AddListener(paths.FRONTEND_RUN, (_, { result, id }) => {
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