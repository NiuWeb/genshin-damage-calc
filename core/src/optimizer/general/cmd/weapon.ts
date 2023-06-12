import { parseArgsmap } from "@src/cmd2/parsearg"
import { weapons } from "@src/resources"
import { ArrayObject } from "@src/utils/combinations/array_objects"
import { searchSimilarStrings } from "@src/utils/search/similarity"
import { Weapon } from "../combinator"
import { getEffectArgs } from "./effect"

const weaponNames = weapons.GetList().map(x => x.Name.toLowerCase())
const weapon4 = weapons.GetList().filter(x => x.Stars === 4).map(x => x.Name.toLowerCase())
const weapon5 = weapons.GetList().filter(x => x.Stars === 5).map(x => x.Name.toLowerCase())

/**
 * Creates a weapon combination from the given arguments.
 */
export function parseWeaponArgs([name, ...args]: string[]): ArrayObject<Weapon> {
    const argsmap = parseArgsmap(args)
    const names = parseWeaponName(name)

    const rank = (argsmap.get("rank") ?? ["1"]).map(x => parseInt(x))

    return { name: names, rank, ...getEffectArgs(argsmap) }
}

/**
 * Gets the weapon names that are similar to the given name.
 */
function parseWeaponName(name: string): string[] {
    if (name === "all") return weaponNames

    if (name === "4*") {
        return weapon4
    }
    if (name === "5*") {
        return weapon5
    }

    const names = searchSimilarStrings({
        list: weaponNames,
        query: name,
        count: 1,
        threshold: 0.4,
    })

    if (names.length === 0) {
        throw new Error(`Weapon name "${name}" not found`)
    }

    return names
}