import { Result } from "@src/optimizer/upgrades"

/** Data to be recieved from a worker */
export interface FromWorker {
    /** request Id */
    id: string
    /**
     * A chunk of sorted results
     */
    result?: Result[][]

    /** Sends the number of rows currently evaluated */
    progress?: number
    /** Sends the total (or estimate total) of rows to evaluate */
    total?: number
}

export enum paths {
    BACKEND_RUN = "backend:upgrades-optimizer/run",
    FRONTEND_RUN = "frontend:upgrades-optimizer/run"
}