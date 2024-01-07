import { genshin } from "@bygdle/genshin-damage-calc-core"

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
        console.error("[CHILD WORKER ERROR]", e)
        worker.Error(e)
        context.postMessage({ error: e })
    }
})