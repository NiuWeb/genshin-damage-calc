import { Compiled, CompiledBasic } from "../type"

/** wraps a basic compiled command (executable function) to a complete compiled
 * command (with String() and toString() methods)
 */
export function WrapCompiled(str: string, basic: CompiledBasic): Compiled {
    return Object.assign(basic, {
        String() {
            return str
        },
        toString() {
            return str
        }
    })
}

/** converts a string array to lowercase */
export function LowerCase(cmd: string[]): string[] {
    cmd.forEach((c, i) => cmd[i] = c.toLowerCase())
    return cmd
}

/** Counts minimum/maximum arguments */
export function CountArgs(args?: string[]): [min: number, max: number] {
    // validate arguments count
    let min = 0
    let max = Infinity

    if (args) {
        max = args.length
        for (const arg of args) {
            if (arg.includes("...")) {
                max = Infinity
            } else {
                min++
            }
        }
    }
    return [min, max]
}