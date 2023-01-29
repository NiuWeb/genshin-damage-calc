import { CommandList } from "@src/cmd2"
import { Scenario } from "./scenario"

/** Wrapper for scenario commands */
export function RunnerCmd(fn: () => CommandList<Scenario>) {
    return fn
}