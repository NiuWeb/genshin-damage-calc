import { parseArg } from "@src/cmd2/parsearg"
import { ArrayObject } from "@src/utils/combinations/array_objects"
import { Weapon } from "../combinator"
import { getEffectArgs } from "./effect"

export function parseWeaponArgs([name, ...args]: string[]): ArrayObject<Weapon> {
    const argsmap = new Map<string, string[]>()
    for (const arg of args) {
        const parsed = parseArg(arg)
        argsmap.set(parsed.name, parsed.value)
    }

    const rank = (argsmap.get("rank") ?? ["1"]).map(x => parseInt(x))

    return { name: [name], rank, ...getEffectArgs(argsmap) }
}