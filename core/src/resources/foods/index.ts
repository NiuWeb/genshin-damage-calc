import { food } from "@src/core"
import { MapList } from "@src/utils/lists/list"
import { foods } from "./list"

// sort foods by stars and then by name
const sorted = [...foods].sort((a, b) => {
    if (a.Stars === b.Stars) {
        return a.Name.localeCompare(b.Name)
    }
    return b.Stars - a.Stars
})
// create generators
    .map(f => food.Factory(f))

const map = new MapList<food.Generator>(f => f.Name)
map.AddList(sorted)

const types = new Map<number, food.Generator[]>()
for (const f of sorted) {
    if (!types.has(f.Type)) {
        types.set(f.Type, [])
    }
    types.get(f.Type)?.push(f)
}

/** gets all the registered foods */
export function GetList(): readonly food.Generator[] {
    return sorted
}

/** finds a registered food by its name. Case insensitive */
export function FindByName(name: string): food.Generator | undefined {
    return map.Find(name)
}

/** gets the list of foods of a given type */
export function GetByType(type: number): food.Generator[] {
    return types.get(type) || []
}