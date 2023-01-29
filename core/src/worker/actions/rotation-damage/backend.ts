import { Runner } from "@src/runner"
import { store } from "@src/store"
import { BackendAction } from "@src/worker/action"
import { FromWorker, ToWorker, paths } from "./config"
import { Logger } from "@src/cmd2"

export class RotationDamageBackend extends BackendAction<ToWorker, FromWorker> {
    constructor() {
        super({
            [paths.BACKEND_RUN]: (id, data) => this.Run(id, data)
        })
    }

    Run(id: string, data: ToWorker): void {
        const runner = new Runner()
        Logger.Global.Out = () => void 0

        const party = store.PartyFrom(data.party)
        runner.Scenario.Party = party

        try {
            runner.Program.CompileString(data.command)()

            const rotation = runner.Scenario.Rotation

            runner.Program.Compile(["rotation", "log", "enable"])()
            runner.Program.Compile(["rotation", "run"])()

            const summary = rotation.GetSummary()
            const details = rotation.GetDetails()

            this.Post(paths.FRONTEND_RUN, { result: { summary, details, log: Logger.Global.String() }, id })
        } catch (e) {
            this.Post(paths.FRONTEND_RUN, { result: { log: Logger.Global.String() }, id })
        }
    }
}