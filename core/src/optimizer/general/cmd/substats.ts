import { CommandList } from "@src/cmd2"
import { parseArgsmap } from "@src/cmd2/parsearg"
import { stats } from "@src/core"
import { Filter } from "@src/optimizer/filter"
import { defaultConfig, SubstatRange } from "@src/optimizer/substats"
import { labels } from "@src/strings/labels"
import { Table } from "@src/strings/table"
import { ArrayObject } from "@src/utils/combinations/array_objects"
import { Artifacts } from "../combinator"
import { getStat } from "./artifactnames"
import { toNumber } from "@src/utils/conversions"

/**
 * Stores config for substats in a combination
 */
export class CombinatorSubstats {
    public Value: SubstatRange[] = []
    public Filter: Filter[] = []
    public Enabled = false

    /** Applies the substats to the combination, if enabled */
    public Apply(combination: ArrayObject<Artifacts>): boolean {
        if (this.Enabled) {
            combination.substats = [[...this.Value]]
            combination.filter = [[...this.Filter]]
        }
        else {
            delete combination.substats
            delete combination.filter
        }
        return this.Enabled
    }

    /**
     * Resets the substat ranges to the default values (configured in substats optimizer)
     */
    public DefaultRange(): Table {
        const table = new Table(labels.STAT, labels.MIN, labels.MAX)
        this.Value = defaultConfig().substats
        for (const { stat, min, max } of this.Value) {
            const statName = stats.stat.Name(stat)
            table.AddRow(statName, min, max)
        }
        return table
    }

    /**
     * Sets the substat ranges from the given arguments.
     * @returns a table of substat names to their ranges
     */
    public ParseRange(args: string[]): Table {
        const table = new Table(labels.STAT, labels.MIN, labels.MAX)
        this.Value = []
        const argsmap = parseArgsmap(args)
        for (const [name, value] of argsmap) {
            const stat = getStat(name)
            if (!stat) throw new Error(`Substat "${name}" not found`)
            let min = 0
            let max = 0
            value.forEach(x => {
                const value = parseFloat(x)
                if (value < min) min = value
                if (value > max) max = value
            })
            this.Value.push({ stat, min, max })

            const statName = stats.stat.Name(stat)
            table.AddRow(statName, min, max)
        }
        return table
    }

    /**
     * Sets the substat minimums from the given arguments.
     * @returns a table of substat names to their minimums
     */
    public ParseMin(args: string[]): Table {
        const table = new Table(labels.STAT, labels.MIN)
        this.Filter = []
        const argsmap = parseArgsmap(args)

        for (const [name, value] of argsmap) {
            const stat = getStat(name)
            if (!stat) throw new Error(`Substat "${name}" not found`)
            if (value.length !== 1) {
                throw new Error(`Substat "${name}" min must be a single value`)
            }
            const min = toNumber(value[0])
            this.Filter.push({ stat, value: min, operator: ">=" })
            table.AddRow(stats.stat.Name(stat), min)
        }
        return table
    }

    /** creates the subcommands for configuring substats */
    public Cmd(): CommandList<unknown> {
        return {
            "enable": {
                description: "Enables substat optimization. When enabled, " +
                    "substats currently in artifacts will be removed, and replaced with " +
                    "an optimal combination of substats based on the ranges defined.",
                arguments: [],
                compile: ({ Log }) => {
                    return () => {
                        Log.Log("Substat optimization enabled")
                        this.Enabled = true
                    }
                }
            },
            "disable": {
                description: "Disables substat optimization. When disabled, " +
                    "substats currently in artifacts will be kept.",
                arguments: [],
                compile: ({ Log }) => {
                    return () => {
                        Log.Log("Substat optimization disabled")
                        this.Enabled = false
                    }
                }
            },
            "range": {
                description: "Defines the range of substats to be used in optimization " +
                    "in the form:\n\n" +
                    "`range <stat>=<min>:<max> [stat2=<min>:<max> ...]`\n\n" +
                    "When executed, the substats optimization will be enabled.",
                arguments: ["..."],
                compile: ({ Log }, args) => {
                    return () => {
                        const table = this.ParseRange(args)
                        Log.Log("Substat optimization ranges:")
                        Log.Log("\n" + table.toString())

                        this.Enabled = true
                        Log.Log("Substat optimization enabled")
                    }
                }
            },
            "min": {
                description: "Adds a minimum value for a substat in the form:\n\n" +
                    "`min <stat>=<min> [stat2=<min> ...]`\n\n" +
                    "When executed, the substats optimization will be enabled.",
                arguments: ["..."],
                compile: ({ Log }, args) => {
                    return () => {
                        const table = this.ParseMin(args)
                        Log.Log("Substat optimization minimums:")
                        Log.Log("\n" + table.toString())

                        this.Enabled = true
                        Log.Log("Substat optimization enabled")
                    }
                }
            },
            "default": {
                description: "Resets the substat ranges to the default values.",
                arguments: [],
                compile: ({ Log }) => {
                    return () => {
                        const table = this.DefaultRange()
                        Log.Log("Substat optimization ranges reset to default:\n" + table)
                    }
                }
            }
        }
    }
}