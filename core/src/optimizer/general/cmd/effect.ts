import { Dictionary } from "@bygdle/cmdlang"
import { SplitString2D } from "@src/utils/strlist"

/**
 * Formats effect arguments
 */
export function getEffectArgs(args: Dictionary) {
    const stacks = SplitString2D(args["stacks"] ?? "0", x => parseInt(x))[0]
    const condition = SplitString2D(args["condition"] ?? "", x => x)
    const aura = SplitString2D(args["aura"] ?? "", x => x)
    const target = SplitString2D(args["target"] ?? "", x => x)

    return { stacks, condition, aura, target }
}