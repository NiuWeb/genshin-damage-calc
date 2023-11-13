import { Compiler, Program } from "@bygdle/cmdlang"
import { stats } from "@src/core"
import { CombinationGroup, Combinator } from "../combinator"
import { parseArtifactArgs } from "./artifact"
import { CombinatorSubstats } from "./substats"
import { WeaponParser } from "./weapon"

/**
 * A program that configures combinations via commands.
 */
export class CombinatorCmd extends Compiler<Combinator, void> {
    private readonly combinator = new Combinator()
    private readonly groups: CombinationGroup[] = []

    public Substats = new CombinatorSubstats()

    /**
     * Creates a combinator command program.
     * @param weaponType The weapon type to use for weapon commands. If not provided,
     * all weapons will be used.
     */
    constructor(weaponType?: number) {
        super({} as Program<Combinator, void>)
        this.catch = false

        const parser = new WeaponParser(weaponType)

        const program = new Program(this.combinator, {
            "add": {
                name: "add",
                description: "Saves the current combinations group and starts a new one.",
                compile: (_, { logger }) => {
                    return () => {
                        this.groups.push(this.combinator.get())
                        this.combinator.clear()
                        logger.log("Combination group saved")
                    }
                }
            },
            "weapon": {
                name: "weapon",
                arguments: "name [rank=] [stacks=] [condition=] [aura=] [target=]",
                docs: {
                    name: "The weapon name can be a partial or similar name, and can be `all`, `4*`, or `5*`.",
                    rank: "Weapon rank, can be a list or range, e.g.:\n" +
                        "- `rank=1,2,3` will use ranks 1, 2, and 3.\n" +
                        "- `rank=1:3` will use ranks 1, 2, and 3.\n" +
                        "- `rank=1:5:2` will use ranks 1, 3, and 5.\n",
                    stacks: "Weapon stacks, can be a list or range, e.g:\n" +
                        "- `stacks=0,1,2` will use stacks 0, 1, and 2.\n" +
                        "- `stacks=0:2` will use stacks 0, 1, and 2.\n" +
                        "- `stacks=0:7:2` will use stacks 0, 2, 4, and 6.\n" +
                        "If the weapon has multiple effects, you can define stack ranges for each effect, e.g.:\n" +
                        "- `stacks=0:2;0:1` will use stacks 0, 1, and 2 for the first effect, and stacks 0 and 1 for the second effect.\n",
                    condition: "Weapon condition, can be a list, e.g.:\n" +
                        "- `condition=on_field,of_field` will use the condition `on_field` and `of_field`.\n" +
                        "If the weapon has multiple effects, you can define conditions for each effect, e.g.:\n" +
                        "- `condition=on_field,of_field;on_field` will use the condition `on_field` and `of_field` for the first effect," +
                        "and `on_field` for the second effect.\n",
                    aura: "Weapon aura, can be a list, e.g.:\n" +
                        "- `aura=pyro,hydro` will use the aura `pyro` and `hydro`.\n" +
                        "If the weapon has multiple effects, you can define auras for each effect, e.g.:\n" +
                        "- `aura=pyro,hydro;pyro` will use the aura `pyro` and `hydro` for the first effect," +
                        "and `pyro` for the second effect.\n",
                    target: "Weapon targets, can be a list, e.g.:\n" +
                        "- `target=mona,keqing` will use the target `mona` and `keqing`.\n" +
                        "If the weapon has multiple effects, you can define targets for each effect, e.g.:\n" +
                        "- `target=mona,keqing;mona` will use the target `mona` and `keqing` for the first effect," +
                        "and `mona` for the second effect.\n",
                },
                description: "Adds weapons to be combined",
                example: "weapon all // all weapons\n" +
                    "weapon 4* // all 4* weapons\n" +
                    "weapon jadespear rank=1,5 stacks=0:7 // Jade Spear, rank 1 or 5, all stacks\n" +
                    "weapon thrillingtales rank=5 target=mona // Thrilling Tales, rank 5, apply to Mona\n",
                compile: ({ values: [name], named: args }, { logger }) => {
                    const combi = parser.Parse(name, args)
                    return () => {
                        this.combinator.addWeapon(combi)
                        logger.logf(
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
                name: "artifact",
                arguments: "sands= goblet= circlet= [set=] [stacks=] [condition=] [aura=] [target=]",
                docs: {
                    sands: "Main stats for sands, can be a short name",
                    goblet: "Main stats for goblet, can be a short name",
                    circlet: "Main stats for circlet, can be a short name",
                    set: "Artifact sets, can be the exact name or a partial name, in the form:\n" +
                        "- `set=SetName*2` will use the set `SetName` with 2 pieces.\n" +
                        "- `set=SetName*4` will use the set `SetName` with 4 pieces.\n" +
                        "- `set=SetName+OtherSet` will use the 2+2 combination of `SetName` and `OtherSet`.\n" +
                        "You can also include lists of sets to combine, e.g.:\n" +
                        "- `set=SetA+SetB,SetC*4` two combinations: 2+2 of `SetA` and `SetB`, and 4 of `SetC`.\n",
                    stacks: "Artifact set stacks, can be a list or range, e.g:\n" +
                        "- `stacks=0,1,2` will use stacks 0, 1, and 2.\n" +
                        "- `stacks=0:2` will use stacks 0, 1, and 2.\n" +
                        "- `stacks=0:7:2` will use stacks 0, 2, 4, and 6.\n" +
                        "If the set has multiple effects, you can define stack ranges for each effect, e.g.:\n" +
                        "- `stacks=0:2;0:1` will use stacks 0, 1, and 2 for the first effect, and stacks 0 and 1 for the second effect.\n",
                    condition: "Artifact set condition, can be a list, e.g.:\n" +
                        "- `condition=on_field,of_field` will use the condition `on_field` and `of_field`.\n" +
                        "If the set has multiple effects, you can define conditions for each effect, e.g.:\n" +
                        "- `condition=on_field,of_field;on_field` will use the condition `on_field` and `of_field` for the first effect," +
                        "and `on_field` for the second effect.\n",
                    aura: "Artifact set aura, can be a list, e.g.:\n" +
                        "- `aura=pyro,hydro` will use the aura `pyro` and `hydro`.\n" +
                        "If the set has multiple effects, you can define auras for each effect, e.g.:\n" +
                        "- `aura=pyro,hydro;pyro` will use the aura `pyro` and `hydro` for the first effect," +
                        "and `pyro` for the second effect.\n",
                    target: "Artifact set targets, can be a list, e.g.:\n" +
                        "- `target=mona,keqing` will use the target `mona` and `keqing`.\n" +
                        "If the set has multiple effects, you can define targets for each effect, e.g.:\n" +
                        "- `target=mona,keqing;mona` will use the target `mona` and `keqing` for the first effect," +
                        "and `mona` for the second effect.\n",
                },

                description: "Adds artifacts to be combined",
                example: "// compare 4pc Crimson Witch and Emblem of Severed Fate,\n" +
                    "// with ATK% vs EM sands, Pyro goblet, and CR vs CD circlet\n" +
                    "artifact sands=atk%,em goblet=pyro circlet=cr,cd set=crimson*4,emblem*4",
                compile: ({ named: args }, { logger }) => {
                    const origin = parseArtifactArgs(args)

                    return () => {
                        const combi = { ...origin }
                        const subs = this.Substats.Apply(combi)
                        this.combinator.addArtifacts(combi)
                        logger.logf(
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
                            logger.log("Applied substats optimization to artifacts")
                        }
                    }
                }
            },
            "substats": {
                name: "substats",
                description: "Configures substats to optimize for the next combination group. " +
                    "By default, substats are not optimized and current artifacts will be used.",
                children: this.Substats.Cmd(),
            }
        })

        this.setProgram(program)
    }

    /**
     * Gets the combination groups currently configured.
     */
    public Groups() {
        return this.groups
    }
}