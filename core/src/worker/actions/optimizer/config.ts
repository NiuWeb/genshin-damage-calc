import { GetOptimizerConfig, GetOptimizerResult, GetOptimizerRow, GetOptimizerList } from "@src/optimizer/type"
import { SubstatsOptimizer } from "@src/optimizer/substats/optimizer"
import { MainstatOptimizer } from "@src/optimizer/mainstat/optimizer"
import { NextRollOptimizer } from "@src/optimizer/nextroll/optimizer"
import { SetOptimizer } from "@src/optimizer/set/optimizer"
import { WeaponOptimizer } from "@src/optimizer/weapon/optimizer"
import { ArtifactsOptimizer } from "@src/optimizer/artifacts/optimizer"

/** Registered optimizers */
export const Register = register({
    SubstatsOptimizer,
    MainstatOptimizer,
    NextRollOptimizer,
    SetOptimizer,
    WeaponOptimizer,
    ArtifactsOptimizer
})

function register<Reg extends Record<string, unknown>>(obj: Reg): GetOptimizerList<Reg> {
    return obj as GetOptimizerList<Reg>
}

/** Registered optimizers */
export type Register = typeof Register


/** Data to send to a optimizer worker from the main thread */
export interface ToWorker<Tool extends keyof Register = keyof Register> {
    /** Optimizer name */
    tool: Tool
    /** Optimizer configuration */
    config: GetOptimizerConfig<Register[Tool]>
    /** Number of child workers to spawn */
    children: number
    /** Number of rows per chunk. It also marks the step for progress message */
    chunk: number
}

/** Data to send to a child optimizer worker from a main optimizer worker */
export interface ToChildWorker<Tool extends keyof Register = keyof Register> extends ToWorker<Tool> {
    /** rows to be evaluated by the child worker */
    rows: GetOptimizerRow<Register[Tool]>[]
}

/** Data to be recieved from a worker */
export interface FromWorker<Tool extends keyof Register = keyof Register> {
    /** request Id */
    id: string
    /**
     * A chunk of sorted results
     */
    result: GetOptimizerResult<Register[Tool]>[]

    /** Sends the number of rows currently evaluated */
    progress?: number
    /** Sends the total (or estimate total) of rows to evaluate */
    total?: number
}

export enum paths {
    BACKEND_RUN = "backend:optimizer/run",
    BACKEND_CHILD_RUN = "backend:optimizer/run/child",
    FRONTEND_RUN = "frontend:optimizer/run",
    FRONTEND_CHILD_RUN = "frontend:optimizer/run/child"
}

/*
The optimizer workers are connected as shown on this diagram:

                                         <------> [Child Worker]
[Main thread] <------> [Main Worker] <----------> [Child Worker]
                                         <------> [Child Worker]

the main worker send chunks of rows to each child to be evaluated,
then each child returns the evaluated results to the main worker,
who instert and sorts them to finally returns the result to the main thread.
*/