import { charbox, rotation } from "@src/core"

export interface ToWorker {
    party: charbox.ExportedParty
    command: string
}

export interface Result {
    summary?: rotation.Summary
    details?: rotation.Details
    log: string
}

export interface FromWorker {
    result: Result
    id: string
}


export enum paths {
    BACKEND_RUN = "backend:rotation-damage/run",
    FRONTEND_RUN = "frontend:rotation-damage/run"
}