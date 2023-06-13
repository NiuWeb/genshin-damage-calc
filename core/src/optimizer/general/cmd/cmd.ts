import { Program } from "@src/cmd2"
import { stats } from "@src/core"
import { CombinationGroup, Combinator } from "../combinator"
import { parseArtifactArgs } from "./artifact"
import { CombinatorSubstats } from "./substats"
import { parseWeaponArgs } from "./weapon"

/**
 * Configures combinations via command
 */
export class CombinatorCmd {
    public readonly Program = new Program(this)
    private readonly combinator = new Combinator()
    private readonly groups: CombinationGroup[] = []

    public Substats = new CombinatorSubstats()

    constructor() {
        this.Program.Set({
            "add": {
                description: "Saves the current combinations group and starts a new one.",
                arguments: [],
                compile: ({ Log }) => {
                    return () => {
                        this.groups.push(this.combinator.get())
                        this.combinator.clear()
                        Log.Log("Combination group saved")
                    }
                }
            },
            "weapon": {
                description: "Adds weapons to be combined, in the form:\n" +
                    "```\nweapon <name> [rank=] [stacks=] [condition=] [aura=]\n```\n" +
                    "- The weapon name can be a partial or similar name, and can be `all`, `4*`, or `5*`.\n" +
                    "- Rank and stacks can be defined as a list, e.g. `rank=1,2,3`, or a range, e.g. `rank=1:3`.\n" +
                    "- Conditions and auras can also be lists, e.g. `aura=pyro,hydro`.\n",
                arguments: ["name", "opts..."],
                compile: ({ Log }, args) => {
                    const combi = parseWeaponArgs(args)
                    return () => {
                        this.combinator.addWeapon(combi)
                        Log.Logf(
                            "\nAdded weapons: %s\n" +
                            "  Rank: %s\n" +
                            "  Stacks: %s\n" +
                            "  Condition: %s\n" +
                            "  Aura: %s",
                            combi.name.join(", "),
                            combi.rank.join(", "),
                            combi.stacks?.join(", "),
                            combi.condition?.join(", ") ?? "",
                            combi.aura?.join(", ") ?? "",
                        )
                    }
                }
            },
            "artifact": {
                description: "Adds artifacts to be combined, in the form:\n" +
                    "```\nartifact [main=] [set=] [stacks=] [condition=] [aura=]\n```\n" +
                    "- The main stat is in the form `main=sands,goblet,circlet`, where each slot can " +
                    "have multiple options separated by `/`.\n" +
                    "- Stacks can be defined as a list, e.g. `rank=1,2,3`, or a range, e.g. `rank=1:3`.\n" +
                    "- Conditions and auras can also be lists, e.g. `aura=pyro,hydro`.\n",
                arguments: ["..."],
                compile: ({ Log }, args) => {
                    const origin = parseArtifactArgs(args)

                    return () => {
                        const combi = { ...origin }
                        const subs = this.Substats.Apply(combi)
                        this.combinator.addArtifacts(combi)
                        Log.Logf(
                            "\nAdded artifacts:\n" +
                            "  Sands: %s\n" +
                            "  Goblet: %s\n" +
                            "  Circlet: %s\n" +
                            "  Stacks: %s\n" +
                            "  Condition: %s\n" +
                            "  Aura: %s",
                            combi.sands.map(x => stats.stat.Name(x)).join(", "),
                            combi.goblet.map(x => stats.stat.Name(x)).join(", "),
                            combi.circlet.map(x => stats.stat.Name(x)).join(", "),
                            combi.stacks?.join(", "),
                            combi.condition?.join(", ") ?? "",
                            combi.aura?.join(", ") ?? "",
                        )
                        if (subs) {
                            Log.Log("Applied substats optimization to artifacts")
                        }
                    }
                }
            },
            "substats": {
                description: "Configures substats to optimize for the next combination group. " +
                    "By default, substats are not optimized and current artifacts will be used.",
                children: this.Substats.Cmd(),
            }
        })
    }

    /**
     * Gets the combination groups currently configured.
     */
    public Groups() {
        return this.groups
    }
}