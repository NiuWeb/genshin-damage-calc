import { genshin } from "@bygdle/genshin-calculator-core"
import GenshinWorker from "./worker?worker"

genshin.worker.SetGenerator(() => {
    const realWorker = new GenshinWorker()
    const virtualWorker = new genshin.worker.VirtualWorker((path, id, data) => (
        realWorker.postMessage({ path, id, data })
    ))
    virtualWorker.SetKiller(() => {
        realWorker.terminate()
        virtualWorker.Error("Worker terminated")
    })
    realWorker.addEventListener("message", ({ data }) => {
        if (data.error) {
            virtualWorker.Error(data.error)
            return
        }
        virtualWorker.Recieve(data.path, data.id, data.data)
    })
    return virtualWorker
})

export { genshin }