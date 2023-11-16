import { Dictionary } from "@bygdle/cmdlang"
import { sets } from "@src/resources"
import { ArrayObject } from "@src/utils/combinations/array_objects"
import { searchSimilarStrings } from "@src/utils/search/similarity"
import { SplitString2D } from "@src/utils/strlist"
import { Artifacts } from "../combinator"
import { getStat } from "./artifactnames"
import { getEffectArgs } from "./effect"

const setNames = sets.GetList().map(x => x.Name.toLowerCase())

/**
 * Creates a weapon combination from the given arguments.
 */
export function parseArtifactArgs(args: Dictionary): ArrayObject<Artifacts> {


    const sands = SplitString2D(args["sands"] ?? "", x => x)[0]
        .map(name => {
            const value = getStat(name)
            if (!value) throw new Error(`Main stat "${name}" not found`)
            return value
        })

    const goblet = SplitString2D(args["goblet"] ?? "", x => x)[0]
        .map(name => {
            const value = getStat(name)
            if (!value) throw new Error(`Main stat "${name}" not found`)
            return value
        })

    const circlet = SplitString2D(args["circlet"] ?? "", x => x)[0]
        .map(name => {
            const value = getStat(name)
            if (!value) throw new Error(`Main stat "${name}" not found`)
            return value
        })

    const result: ArrayObject<Artifacts> = { sands, goblet, circlet, ...getEffectArgs(args) }

    const set = SplitString2D(args["set"] ?? "", x => x)[0]
        .map(name => parseSetNames(name))

    if (args["set"]) {
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