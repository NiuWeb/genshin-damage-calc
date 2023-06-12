import { Program } from "@src/cmd2"
import { CombinationGroup, Combinator } from "../combinator"
import { parseArtifactArgs } from "./artifact"
import { parseWeaponArgs } from "./weapon"

export function CombinatorCmd() {
    const combinator = new Combinator()
    const groups: CombinationGroup[] = []
    const program = new Program(groups)

    program.Set({
        "add": {
            description: "Saves the current combinations group and starts a new one.",
            arguments: [],
            compile() {
                return () => {
                    groups.push(combinator.get())
                    combinator.clear()
                }
            }
        },
        "weapon": {
            description: "Adds weapons to be combined. In the form:\n\n" +
                "weapon <name> [rank=1] [stacks=1] [condition=] [aura=]`\n\n" +
                "- The weapon name can be a partial or similar name, and can be `all`, `4*`, or `5*`.\n" +
                "- Rank and stacks can be defined as a list, e.g. `rank=1,2,3`, or a range, e.g. `rank=1:3`.\n" +
                "- Conditions and auras can also be lists, e.g. `aura=pyro,hydro`.\n",
            arguments: ["name", "opts..."],
            compile(_, args) {
                const combi = parseWeaponArgs(args)
                return () => {
                    combinator.addWeapon(combi)
                }
            }
        },
        "artifact": {
            description: "Adds artifacts to be combined." +
                "In the form:\n\n" +
                "artifact [main=] [set=] [stacks=] [condition=] [aura=]`\n\n" +
                "- The main stat is in the form `main=sands,goblet,circlet`, where each slot can " +
                "have multiple options separated by `/`.\n" +
                "- Stacks can be defined as a list, e.g. `rank=1,2,3`, or a range, e.g. `rank=1:3`.\n" +
                "- Conditions and auras can also be lists, e.g. `aura=pyro,hydro`.\n",
            arguments: ["..."],
            compile(_, args) {
                const combi = parseArtifactArgs(args)
                return () => {
                    combinator.addArtifacts(combi)
                }
            }
        }
    })

    return program
}


const prog = CombinatorCmd()

prog.CompileString(`
    # substats range cr=0:10 cd=0:12 atk%=0:12 em=0:12

    weapon blackcliffbow stacks=0,3
    artifact main=atk%/em,pyro,cr set=gladiator*4,gladiator+crimson
    add

    # substats range cr=0:12 cd=0:10 atk%=0:12 em=0:12
    # substats filter cr=150%
    weapon royalbow
    artifact main=atk%/em,pyro,cd
    add
`)()

for (const combi of Combinator.Generate(...prog.Value)) {
    console.log(combi)
}