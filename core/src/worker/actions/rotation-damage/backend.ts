import { Runner } from "@src/runner"
import { store } from "@src/store"
import { BackendAction } from "@src/worker/action"
import { FromWorker, ToWorker, paths } from "./config"
import { Logger } from "@bygdle/cmdlang"
import { GetConstants } from "@src/utils/constants"

export class RotationDamageBackend extends BackendAction<ToWorker, FromWorker> {
    constructor() {
        super({
            [paths.BACKEND_RUN]: (id, data) => this.Run(id, data)
        })
    }

    Run(id: string, data: ToWorker): void {
        Logger.Global.out = () => void 0
        Logger.Global.save = true

        const party = store.PartyFrom(data.party)
        const runner = new Runner()
        runner.Scenario.Party = party

        const constants = GetConstants(party)
        for(const name in constants) {
            runner.constants.set(name, constants[name])
        }

        try {
            runner.compileString(data.command)()
            const rotation = runner.Scenario.Rotation

            runner.compileString("rotation log enable")()
            runner.compileString("rotation run")()

            const summary = rotation.GetSummary()
            const details = rotation.GetDetails()

            this.Post(paths.FRONTEND_RUN, { result: { summary, details, log: Logger.Global.toString() }, id })
        } catch (e) {
            this.Post(paths.FRONTEND_RUN, { result: { log: Logger.Global.toString() }, id })
            console.error(e)
        }
    }
}