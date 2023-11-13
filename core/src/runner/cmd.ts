import { Command, Dictionary } from "@bygdle/cmdlang"
import { Scenario } from "./scenario"

/** Wrapper for scenario commands */
export function RunnerCmd(fn: () => Dictionary<Command<Scenario, void>>) {
    return fn
}