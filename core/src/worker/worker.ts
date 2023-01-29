let idcounter = 0

/** function that posts messages from the worker */
export type WorkerPoster<Sent = unknown> = (path: string, id: string, data: Sent) => void

/** function that recieves messages to the worker */
export type WorkerListener<Recieved = unknown> = (id: string, data: Recieved) => void

/** function that recieves an error message */
export type ErrorListener = (reason: unknown) => void

/** Worker implementation independent from platform-specific methods */
export class VirtualWorker<Recieved, Sent> {
    constructor(private poster: WorkerPoster<Sent>) { }
    private listenersByPath = new Map<string, WorkerListener<Recieved>[]>()
    private pathsByListener = new Map<WorkerListener<Recieved>, string>()
    private errorListeners: ErrorListener[] = []
    private killer?: (() => void)

    /** Changes the poster function */
    SetPoster(poster: WorkerPoster<Sent>): void {
        this.poster = poster
    }

    /** Changes the function that kills the worker */
    SetKiller(fn: () => void): void {
        this.killer = fn
    }

    /** Terminates the worker */
    Kill(): void {
        if (!this.killer) {
            throw new Error("No killer function is defined for this worker")
        }
        this.killer()
    }

    /** 
     * Sends a message to outside the worker
     * @returns a generated id for the posted data
     */
    Post(path: string, data: Sent): string {
        const id = (++idcounter).toString(36)
        this.poster(path, id, data)
        return id
    }

    /** 
     * Recieves a message from outside the worker, triggering all listeners
     * registered to the given path.
     * */
    async Recieve(path: string, id: string, data: Recieved): Promise<void> {
        const listeners = this.listenersByPath.get(path)
        if (!listeners) {
            console.error("WORKER PATH NOT FOUND: ", path)
            return
        }
        for (const listener of [...listeners]) {
            await listener(id, data)
        }
    }

    /** Sends an error message and triggers all error listeners */
    async Error(reason: unknown): Promise<void> {
        for (const error of [...this.errorListeners]) {
            await error(reason)
        }
    }
    /** Adds a new listener for worker errors */
    AddErrorListener(listener: ErrorListener): ErrorListener {
        if (this.errorListeners.includes(listener)) {
            throw new Error("Cannot add the same listener twice")
        }
        this.errorListeners.push(listener)

        return listener
    }

    /** Removes an error listener */
    RemoveErrorListener(listener: ErrorListener): boolean {
        const index = this.errorListeners.indexOf(listener)
        if (index === -1) {
            return false
        }
        this.errorListeners.splice(index, 1)
        return true
    }

    /**
     * Adds a new listener for a given path. Throws an error
     * if a same function is attempted to be added twice.
     * @returns the same input listener function.
     */
    AddListener(path: string, listener: WorkerListener<Recieved>): WorkerListener<Recieved> {
        if (this.pathsByListener.has(listener)) {
            throw new Error("Cannot add the same listener twice")
        }
        this.pathsByListener.set(listener, path)
        let array = this.listenersByPath.get(path)
        if (!array) {
            array = []
            this.listenersByPath.set(path, array)
        }
        array.push(listener)
        return listener
    }

    /** Removes a previously added listener */
    RemoveListener(listener: WorkerListener<Recieved>): boolean {
        const path = this.pathsByListener.get(listener)
        if (!path) {
            return false
        }
        const array = this.listenersByPath.get(path)
        if (!array) {
            return false
        }
        const index = array.indexOf(listener)
        if (index === -1) {
            return false
        }
        array.splice(index, 1)
        return true
    }
}