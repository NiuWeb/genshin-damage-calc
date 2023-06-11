import { ArrayObject } from "@src/utils/combinations/array_objects"
import { Artifacts } from "../combinator"
import { getStat } from "./artifactnames"
import { getEffectArgs, parseArgsmap } from "./effect"

/**
 * Creates a weapon combination from the given arguments.
 */
export function parseArtifactArgs(args: string[]): ArrayObject<Artifacts> {
    const argsmap = parseArgsmap(args)

    const mains = (argsmap.get("main") || ["atk%", "atk%", "atk%"])
        .map(x => x.split("/"))
        .map(names => 
            names.map(name => { 
                const value = getStat(name)
                if (!value) throw new Error(`Main stat "${name}" not found`)
                return value
            })
    ) 
    const [sands, goblet, circlet] = mains

    return { sands, goblet, circlet, ...getEffectArgs(argsmap) }
}