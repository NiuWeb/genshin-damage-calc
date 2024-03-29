import { GenerateChunks } from "@src/utils/generator/chunks"
import { BackendAction } from "@src/worker/action"
import { FromWorker, WORKER_PATHS, Register, ToWorker, SetThreadType, THREAD_TYPE } from "./config"
import { OptimizerChild } from "./frontend-child"
import { Logger } from "@bygdle/cmdlang"

/**
 * The main worker will spawn a number of child workers
 * and distribute the rows to evaluate between them.
 * 
 * The size of the chunk will be split into the number
 * of child workers, and the worker will wait for all
 * child workers to finish their fragment before
 * requesting another chunk.
 * 
 * This main worker also sends to the main thread
 * the progress of the evaluation once each chunk
 * is evaluated, and is terminated once all the
 * rows are evaluated.
 */
export class OptimizerBackend extends BackendAction<ToWorker, FromWorker> {
    constructor() {
        super({
            [WORKER_PATHS.BACKEND_RUN]: (id, data) => this.Run(id, data)
        })
    }

    async Run(id: string, data: ToWorker) {
        SetThreadType(THREAD_TYPE.MAIN_WORKER)

        // disable logs
        Logger.Global.save = false
        Logger.Global.out = () => void 0

        // initialize the requested optimizer
        const optimizer = new Register[data.tool]()
        optimizer.Init(data.config as never)

        // create message sender function
        const sender = (() => {
            const sender = optimizer.SendMessage
            if (!sender) {
                return () => void 0
            }

            return async () => {
                const message = sender()
                optimizer.RecieveMessage(message as never)
                await Promise.all(
                    children.map(child => (
                        child.SendMessage(message)
                    ))
                )
            }
        })()

        // send initialization message to main thread including the total number of rows
        const total = optimizer.GetTotal()
        this.Post(WORKER_PATHS.FRONTEND_RUN, { id: "progress:" + id, result: [], progress: 0, total })

        const CHUNKS = Math.min(data.chunk, optimizer.MAX_CHUNK_SIZE)

        const childCount = Math.min(data.children, optimizer.MAX_CHILDREN)

        console.log(`[WORKER] Spawning ${childCount} child workers`)

        // spawn all the child workers before continuing
        const children = Spawn(childCount)
        await Promise.all(children.map(child => child.Init({ ...data, rows: [] })))

        // the optimizer initialized in this main worker will be in charge of
        // generating the combinations to evaluate.

        // get the type of the generator
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

            // insert the results in the optimizer
            for (const result of results) {
                optimizer.Insert(result as never)
            }

            // send a message to all the children
            await sender()

            // send the progress to the main thread
            progress += chunk.length
            this.Post(WORKER_PATHS.FRONTEND_RUN, { id: "progress:" + id, result: [], progress, total })
        }
        const result = optimizer.Get()

        const transform = (() => {
            if (optimizer.TRANSFORM) {
                return optimizer.Transform(result as never)
            }
            return undefined
        })()

        const formatted = (() => {
            try {
                return optimizer.Format(result as never).Serialize()
            } catch (e) {
                console.error("Could not format optimizer results", e)
                return undefined
            }
        })()

        const cmd = result.map(r => {
            try {
                return optimizer.EquipCmd(r as never)
            } catch (e) {
                return "// " + String(e).valueOf()
            }
        })

        children.forEach(child => child.Kill())
        this.Post(WORKER_PATHS.FRONTEND_RUN, { id, result, transform, cmd, formatted })
    }
}

function Spawn(children: number) {
    return Array
        .from(Array(children))
        .fill(0)
        .map(() => new OptimizerChild())
}