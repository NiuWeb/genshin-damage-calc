import { Generate } from "./config"
import { VirtualWorker, WorkerListener } from "./worker"

export type WorkerActionsList<Recieved> = {
    [actionPath: string]: WorkerListener<Recieved>
}

export class BackendAction<Recieved, Sent> {
    constructor(public actions: WorkerActionsList<Recieved>) { }

    private worker?: VirtualWorker<Recieved, Sent>
    private listeners: WorkerListener<Recieved>[] = []

    Post(path: string, data: Sent): void {
        const worker = this.worker
        if (!worker) {
            throw new Error("Worker not set for this action")
        }
        worker.Post(path, data)
    }

    SetWorker(worker: VirtualWorker<Recieved, Sent>): void {
        if (this.worker) {
            this.RemoveWorker()
        }
        for (const path in this.actions) {
            const listener = this.actions[path]
            worker.AddListener(path, listener)
            this.listeners.push(listener)
        }
        this.worker = worker
    }

    RemoveWorker(): void {
        if (!this.worker) { return }
        for (const listener of this.listeners) {
            this.worker.RemoveListener(listener)
        }
    }
}

export class FrontendAction<Recieved, Sent> {
    constructor() {
        this.worker = Generate() as VirtualWorker<Recieved, Sent>
    }
    worker: VirtualWorker<Recieved, Sent>

    Kill(): void {
        this.worker.Kill()
    }
}