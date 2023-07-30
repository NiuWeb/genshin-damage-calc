import { Alert } from "@src/popup/alert"
import { Confirm } from "@src/popup/confirm"
import { Loading } from "@src/popup/loading"
import { GetString } from "@src/strings/strings"
import { Calc } from "../calc"
import { genshin } from "../core"


export interface Result<Tool extends genshin.worker.OptimizerKey> {
    result?: genshin.worker.OptimizerResult<Tool>
    transform?: genshin.worker.OptimizerTransform<Tool>
    time: number
    error: boolean
}
export interface WorkerConfig {
    // Size of chunks to send to the child workers
    chunk?: number
    terminate?: boolean
}

export type Params<Tool extends genshin.worker.OptimizerKey> = [
    tool: Tool,
    config: Omit<genshin.worker.OptimizerConfig<Tool>, "Party" | "Cmd">,
    workerConfig: WorkerConfig
]

export async function RunOptimizer<Tool extends genshin.worker.OptimizerKey>(...[tool, config, { chunk, terminate = true }]: Params<Tool>): Promise<Result<Tool>> {
    const scenario = Calc.Get().Scenario
    const Cmd = Calc.Editor.GetFile("rotation_editor")
    const Party = genshin.charbox.ExportParty(scenario.Party)

    const Config = {
        Cmd,
        Party,
        ...config,
    } as genshin.worker.OptimizerConfig<Tool>

    const worker = new genshin.worker.Optimizer()
    worker.Children = Calc.Config.Workers || 1
    worker.Chunk = chunk || 100

    const loading = new Loading()
    worker.OnProgress = (current, total) => {
        loading.SetProgress(current)
        loading.SetTotal(total)
    }

    loading.OnClose = async () => {
        const confirm = await Confirm({ content: GetString("MSG.CONFIRM_CANCEL") })
        if (!confirm) { return }
        worker.Kill()
        loading.End()
    }

    let result: genshin.worker.OptimizerResult<Tool> | undefined = undefined
    let transform: genshin.worker.OptimizerTransform<Tool> | undefined = undefined
    let error = false
    try {
        const res = await worker.Run(tool, Config)
        result = res.result
        transform = res.transform
    } catch (e) {
        error = true
        if (typeof e === "string") {
            console.warn("[WORKER]", e)
        } else Alert({
            content: String(e).valueOf()
        })
    }
    if (terminate) {
        worker.Kill()
    }
    const time = loading.End()

    return { result, transform, time, error }
}