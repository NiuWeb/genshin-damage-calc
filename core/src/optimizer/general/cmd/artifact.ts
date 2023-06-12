import { sets } from "@src/resources"
import { ArrayObject } from "@src/utils/combinations/array_objects"
import { searchSimilarStrings } from "@src/utils/search/similarity"
import { Artifacts } from "../combinator"
import { getStat } from "./artifactnames"
import { getEffectArgs, parseArgsmap } from "./effect"

const setNames = sets.GetList().map(x => x.Name.toLowerCase())

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

    const set = argsmap.get("set")?.map(x => parseSetNames(x))

    const result: ArrayObject<Artifacts> = { sands, goblet, circlet, ...getEffectArgs(argsmap) }
    if (set) {
        result.set = set
    }

    return result
}


const EXPR_DOUBLE = /^([a-z]+)\+([a-z]+)$/i
const EXPR_SINGLE = /^([a-z]+)\*(4|2)$/i
function parseSetNames(name: string): string[] {
    let match = name.match(EXPR_DOUBLE)
    if (match) {
        const [, name1, name2] = match
        return [getExactSetName(name1), getExactSetName(name2)]
    }

    match = name.match(EXPR_SINGLE)
    if (match) {
        const [, name, count] = match
        const names = []
        for (let i = 0; i < parseInt(count) / 2; i++) {
            names.push(getExactSetName(name))
        }
        return names
    }

    return [getExactSetName(name)]
}

function getExactSetName(name: string): string {
    const names = searchSimilarStrings({
        list: setNames,
        query: name,
        count: 1,
        threshold: 0.2
    })

    if (names.length === 0) {
        throw new Error(`Set name "${name}" not found`)
    }

    return names[0]
}