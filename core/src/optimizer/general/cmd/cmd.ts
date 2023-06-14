import { Program } from "@src/cmd2"
import { stats } from "@src/core"
import { CombinationGroup, Combinator } from "../combinator"
import { parseArtifactArgs } from "./artifact"
import { CombinatorSubstats } from "./substats"
import { WeaponParser } from "./weapon"

/**
 * A program that configures combinations via commands.
 */
export class CombinatorCmd {
    public readonly Program = new Program(this)
    private readonly combinator = new Combinator()
    private readonly groups: CombinationGroup[] = []

    public Substats = new CombinatorSubstats()

    /**
     * Creates a combinator command program.
     * @param weaponType The weapon type to use for weapon commands. If not provided,
     * all weapons will be used.
     */
    constructor(weaponType?: number) {
        const parser = new WeaponParser(weaponType)

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
                    "```\nweapon <name> [rank=] [stacks=] [condition=] [aura=] [target=]\n```\n" +
                    "- The weapon name can be a partial or similar name, and can be `all`, `4*`, or `5*`.\n" +
                    "- Rank and stacks can be defined as a list, e.g. `rank=1,2,3`, or a range, e.g. `rank=1:3`.\n" +
                    "- Conditions and auras can also be lists, e.g. `aura=pyro,hydro`.\n",
                arguments: ["name", "opts..."],
                example: "weapon all // all weapons\n" +
                    "weapon 4* // all 4* weapons\n" +
                    "weapon jadespear rank=1,5 stacks=0:7 // Jade Spear, rank 1 or 5, all stacks\n" +
                    "weapon thrillingtales rank=5 target=mona // Thrilling Tales, rank 5, apply to Mona\n",
                compile: ({ Log }, args) => {
                    const combi = parser.Parse(args)
                    return () => {
                        this.combinator.addWeapon(combi)
                        Log.Logf(
                            "\nAdded weapons: %s\n" +
                            "  Rank: %s\n" +
                            "  Stacks: %s\n" +
                            "  Condition: %s\n" +
                            "  Aura: %s\n" +
                            "  Target: %s\n",
                            combi.name.join(", "),
                            combi.rank.join(", "),
                            combi.stacks?.join(", "),
                            combi.condition?.join(", ") ?? "",
                            combi.aura?.join(", ") ?? "",
                            combi.target?.join(", ") ?? "",
                        )
                    }
                }
            },
            "artifact": {
                description: "Adds artifacts to be combined, in the form:\n" +
                    "```\nartifact [main=] [set=] [stacks=] [condition=] [aura=] [target=]\n```\n" +
                    "- The main stat is in the form `main=sands,goblet,circlet`, where each slot can " +
                    "have multiple options separated by `/`.\n" +
                    "- Stacks can be defined as a list, e.g. `rank=1,2,3`, or a range, e.g. `rank=1:3`.\n" +
                    "- Conditions and auras can also be lists, e.g. `aura=pyro,hydro`.\n",
                arguments: ["..."],
                example: "// compare 4pc Crimson Witch and Emblem of Severed Fate,\n" +
                    "// with ATK% vs EM sands, Pyro goblet, and CR vs CD circlet\n" +
                    "artifact main=atk%/em,pyro,cr/cd set=crimson*4,emblem*4",
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
                            "  Aura: %s\n" +
                            "  Target: %s\n",
                            combi.sands.map(x => stats.stat.Name(x)).join(", "),
                            combi.goblet.map(x => stats.stat.Name(x)).join(", "),
                            combi.circlet.map(x => stats.stat.Name(x)).join(", "),
                            combi.stacks?.join(", "),
                            combi.condition?.join(", ") ?? "",
                            combi.aura?.join(", ") ?? "",
                            combi.target?.join(", ") ?? "",
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