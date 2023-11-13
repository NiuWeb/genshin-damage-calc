import { stats } from "@src/core"
import { defaultConfig, BaseConfig } from "@src/optimizer/substats"
import { labels } from "@src/strings/labels"
import { Table } from "@src/strings/table"
import { ArrayObject } from "@src/utils/combinations/array_objects"
import { Artifacts, Combinator } from "../combinator"
import { getStat } from "./artifactnames"
import { toNumber } from "@src/utils/conversions"
import { SubstatTier } from "@src/core/scaling"
import { Command, Dictionary } from "@bygdle/cmdlang"

/**
 * Stores config for substats in a combination
 */
export class CombinatorSubstats {
    public Value: BaseConfig = defaultConfig()
    public Enabled = false

    /** Applies the substats to the combination, if enabled */
    public Apply(combination: ArrayObject<Artifacts>): boolean {
        if (this.Enabled) {
            combination.substats = [{ ...this.Value }]
        }
        else {
            delete combination.substats
        }
        return this.Enabled
    }

    /**
     * Resets the substat ranges to the default values (configured in substats optimizer)
     */
    public DefaultRange(): string {
        const table = new Table(labels.STAT, labels.MIN, labels.MAX)
        this.Value = defaultConfig()
        for (const { stat, min, max } of this.Value.substats) {
            const statName = stats.stat.Name(stat)
            table.AddRow(statName, min, max)
        }

        return `Total: ${this.Value.total}\n` +
            `Tier: ${this.Value.tier}\n` +
            table.toString()
    }

    /**
     * Sets the substat ranges from the given arguments.
     * @returns a table of substat names to their ranges
     */
    public ParseRange(args: string[]): string {
        const table = new Table(labels.STAT, labels.MIN, labels.MAX)
        const substats: BaseConfig["substats"] = []
        const argsmap = parseArgsmap(args)
        for (const [name, value] of argsmap) {
            const stat = getStat(name)
            if (!stat) throw new Error(`Substat "${name}" not found`)
            let min = Infinity
            let max = 0
            value.forEach(x => {
                const value = parseFloat(x)
                if (value < min) min = value
                if (value > max) max = value
            })
            substats.push({ stat, min, max })

            const statName = stats.stat.Name(stat)
            table.AddRow(statName, min, max)
        }
        this.Value.substats = substats
        return table + ""
    }

    /**
     * Sets the substat minimums from the given arguments.
     * @returns a table of substat names to their minimums
     */
    public ParseMin(args: string[]): Table {
        const table = new Table(labels.STAT, labels.MIN)
        const filter: BaseConfig["filter"] = []
        const argsmap = parseArgsmap(args)

        for (const [name, value] of argsmap) {
            const stat = getStat(name)
            if (!stat) throw new Error(`Substat "${name}" not found`)
            if (value.length !== 1) {
                throw new Error(`Substat "${name}" min must be a single value`)
            }
            const min = toNumber(value[0])
            filter.push({ stat, value: min, operator: ">=" })
            table.AddRow(stats.stat.Name(stat), min)
        }
        this.Value.filter = filter
        return table
    }

    /** creates the subcommands for configuring substats */
    public Cmd(): Dictionary<Command<Combinator, void>> {
        return {
            "enable": {
                name: "enable",
                description: "Enables substat optimization. When enabled, " +
                    "substats currently in artifacts will be removed, and replaced with " +
                    "an optimal combination of substats based on the ranges defined.",
                compile: (_, { logger }) => {
                    return () => {
                        logger.log("Substat optimization enabled")
                        this.Enabled = true
                    }
                }
            },
            "disable": {
                name: "disable",
                description: "Disables substat optimization. When disabled, " +
                    "substats currently in artifacts will be kept.",
                compile: (_, { logger }) => {
                    return () => {
                        this.Enabled = false
                        logger.log("Substat optimization disabled")
                    }
                }
            },
            "total": {
                name: "total",
                description: "Sets the total substat rolls to optimize. " +
                    "Values must be between 0 and 45.",
                arguments: "total",
                example: "substats total 25 // optimize for 25 substat rolls",
                compile: ({ values: [strval] }, { logger }) => {
                    const total = parseInt(strval)
                    if (isNaN(total) || total < 0 || total > 45) {
                        throw new Error("Total must be between 0 and 45")
                    }
                    return () => {
                        this.Value.total = total
                        logger.log(`Substat optimization total set to ${total}`)
                        this.Enabled = true
                        logger.log("Substat optimization enabled")
                    }
                }
            },
            "tier": {
                name: "tier",
                description: "Sets the tier of substat rolls to optimize. \n",
                arguments: "tier",
                docs: {
                    tier: "a number from 0 to 4, where 0 is the lowest tier and 3 is the highest tier." +
                        "Also, the number 4 or the word `avg` can be used to set the tier to the average."
                },
                example: "substats tier 3 // optimize max-rolls\n" +
                    "substats tier avg // optimize average rolls",
                compile: ({ values: [str] }, { logger }) => {
                    let tier: number
                    let msg: string

                    if (str === "avg" || str === "4") {
                        tier = SubstatTier.ROLL_AVG
                        msg = "AVERAGE"
                    } else {
                        tier = Math.max(0, Math.min(4, Math.floor(toNumber(str))))
                        msg = tier + ""
                    }

                    return () => {
                        this.Value.tier = tier
                        logger.logf("Substat optimization tier set to %s", msg)
                        this.Enabled = true
                        logger.log("Substat optimization enabled")
                    }
                }
            },
            "range": {
                description: "Defines the range of substats to be used in optimization " +
                    "in the form:\n\n" +
                    "`range <stat>=<min>:<max> [stat2=<min>:<max> ...]`\n\n" +
                    "When executed, the substats optimization will be enabled.",
                arguments: ["..."],
                example: "substats range atk=2:12 cr=2:10 cd=2:12 em=2:12 // standard range",
                compile: ({ Log }, args) => {
                    return () => {
                        const table = this.ParseRange(args)
                        logger.log("Substat optimization ranges:")
                        logger.log("\n" + table.toString())

                        this.Enabled = true
                        logger.log("Substat optimization enabled")
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
                        logger.log("Substat optimization minimums:")
                        logger.log("\n" + table.toString())

                        this.Enabled = true
                        logger.log("Substat optimization enabled")
                    }
                }
            },
            "default": {
                name: "default",
                description: "Resets the substat ranges to the default values.",
                compile: (_, { logger }) => {
                    return () => {
                        const table = this.DefaultRange()
                        logger.log("Substat optimization ranges reset to default:\n" + table)
                        this.Enabled = true
                        logger.log("Substat optimization enabled")
                    }
                }
            }
        }
    }
}