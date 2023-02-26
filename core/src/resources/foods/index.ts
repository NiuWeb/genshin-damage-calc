import type { Generator } from "@src/core/food/type"
import { Factory } from "@src/core/food/food"
import { MapList } from "@src/utils/lists/list"
import { foods } from "./list"

// sort foods by stars and then by name
const sorted = [...foods].sort((a, b) => {
    if (a.Stars === b.Stars) {
        return a.Name.localeCompare(b.Name)
    }
    return b.Stars - a.Stars
}).map(f => Factory(f))

const map = new MapList<Generator>(f => f.Name)
map.AddList(sorted)

const types = new Map<number, Generator[]>()
for (const f of sorted) {
    if (!types.has(f.Type)) {
        types.set(f.Type, [])
    }
    types.get(f.Type)?.push(f)
}

/** gets all the registered foods */
export function GetList(): readonly Generator[] {
    return sorted
}

/** finds a registered food by its name. Case insensitive */
export function FindByName(name: string): Generator | undefined {
    return map.Find(name)
}

/** gets the list of foods of a given type */
export function GetByType(type: number): Generator[] {
    return types.get(type) || []
}