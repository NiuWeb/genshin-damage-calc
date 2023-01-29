import { Logger } from "@src/cmd2"
import { GenerateChunks } from "@src/utils/generator/chunks"
import { BackendAction } from "@src/worker/action"
import { FromWorker, paths, Register, ToWorker } from "./config"
import { OptimizerChild } from "./frontend-child"

export class OptimizerBackend extends BackendAction<ToWorker, FromWorker> {
    constructor() {
        super({
            [paths.BACKEND_RUN]: (id, data) => this.Run(id, data)
        })
    }

    async Run(id: string, data: ToWorker) {
        // disable logs
        Logger.Global.SaveLogs = false
        Logger.Global.Out = () => void 0

        const optimizer = new Register[data.tool]()
        optimizer.Init(data.config as never)
        const total = optimizer.GetTotal()
        this.Post(paths.FRONTEND_RUN, { id: "progress:" + id, result: [], progress: 0, total })

        const CHUNKS = data.chunk

        console.log(`[WORKER] Spawning ${data.children} child workers`)

        const children = Spawn(data.children)
        await Promise.all(children.map(child => child.Init({ ...data, rows: [] })))

        type gen = ReturnType<typeof optimizer.Generate> extends Generator<infer T, void, void> ? T : never
        // group the combinations in chunks
        const generator = GenerateChunks<gen>(CHUNKS * children.length, optimizer.Generate())

        let progress = 0
        for (const chunk of generator) {
            // distribute a chunk to all the children and wait for response
            const chunkResults = await Promise.all(children.map((child, i) => {
                const subchunk = chunk.slice(i * CHUNKS, (i + 1) * CHUNKS)
                return child.Send({ ...data, rows: subchunk })
            }))
            // reduce to a single array
            const results = chunkResults.reduce((a, b) => {
                b.forEach(b => a.push(b))
                return a
            }, [])

            for (const result of results) {
                optimizer.Insert(result as never)
            }
            progress += chunk.length

            this.Post(paths.FRONTEND_RUN, { id: "progress:" + id, result: [], progress, total })
        }
        const result = optimizer.Get()

        children.forEach(child => child.Kill())
        this.Post(paths.FRONTEND_RUN, { id, result })
    }


}

function Spawn(children: number) {
    return Array
        .from(Array(children))
        .fill(0)
        .map(() => new OptimizerChild())
}