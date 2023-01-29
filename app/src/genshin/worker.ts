import { genshin } from "@bygdle/genshin-calculator-core"
import GenshinWorker from "./worker_child?worker"

genshin.worker.SetGenerator(() => {
    const realWorker = new GenshinWorker()
    const virtualWorker = new genshin.worker.VirtualWorker((path, id, data) => (
        realWorker.postMessage({ path, id, data })
    ))
    virtualWorker.SetKiller(() => realWorker.terminate())
    realWorker.addEventListener("message", async ({ data }) => {
        if (data.error) {
            await virtualWorker.Error(data.error)
            return
        }
        virtualWorker.Recieve(data.path, data.id, data.data)
    })
    return virtualWorker
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const context: Worker = self as any

const worker = genshin.worker.BackendWorker((path, id, data) => (
    context.postMessage({ path, id, data })
))
worker.SetKiller(() => context.terminate())

context.addEventListener("message", async ({ data }) => {
    try {
        await worker.Recieve(data.path, data.id, data.data)
    } catch (e) {
        console.error("[WORKER ERROR]", e)
        worker.Error(e)
        context.postMessage({ error: e })
    }
})