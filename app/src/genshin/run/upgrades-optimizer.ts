import { Alert } from "@src/popup/alert"
import { Confirm } from "@src/popup/confirm"
import { Loading } from "@src/popup/loading"
import { GetString } from "@src/strings/strings"
import { Calc } from "../calc"
import { genshin } from "../core"
import { errorMsgDiv } from "./errormsg"


export interface Result {
    result?: genshin.optimizer.upgrades.Result[][]
    time: number
    error: boolean
}
export interface WorkerConfig {
    terminate?: boolean
}

export async function RunUpgradesOptimizer(config: genshin.optimizer.upgrades.Config, { terminate }: WorkerConfig): Promise<Result> {
    const scenario = Calc.Get().Scenario
    const Cmd = Calc.Editor.GetFile("rotation_editor")
    const Party = genshin.charbox.ExportParty(scenario.Party)

    const Config: genshin.optimizer.upgrades.Config = {
        Cmd,
        Party,
        ...config,
    }

    const worker = new genshin.worker.UpgradesOptimizer()

    const loading = new Loading()
    worker.OnProgress = (current, total) => {
        loading.SetProgress(current || 0)
        loading.SetTotal(total || 0)
    }

    loading.OnClose = async () => {
        const confirm = await Confirm({ content: GetString("MSG.CONFIRM_CANCEL") })
        if (!confirm) { return }
        worker.Kill()
        loading.End()
    }

    let result: genshin.optimizer.upgrades.Result[][] | undefined = undefined
    let error = false
    try {
        const res = await worker.Run(Config)
        result = res
    } catch (e) {
        error = true
        if (typeof e === "string") {
            console.warn("[WORKER]", e)
        } else Alert({
            content: errorMsgDiv(String(e).valueOf())
        })
    }
    if (terminate) {
        worker.Kill()
    }
    const time = loading.End()

    return { result, time, error }
}