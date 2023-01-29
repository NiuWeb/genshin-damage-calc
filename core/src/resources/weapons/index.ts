import { weapon } from "@src/core"
import { MapList } from "@src/utils/lists/list"
import * as list from "./list"
export * from "./list"

const sorted = Object.values(list).sort((a, b) => {
    if (a.Type === b.Type) {
        if (a.Stars === b.Stars) {
            return a.Name.localeCompare(b.Name)
        } else {
            return a.Stars - b.Stars
        }
    } else {
        return a.Type - b.Type
    }
})
const types: { [type: number]: weapon.Generator[] } = {}
for (const wp of sorted) {
    if (!types[wp.Type]) {
        types[wp.Type] = []
    }
    types[wp.Type].push(wp)
}
const wps = new MapList<weapon.Generator>(wp => wp.Name)
wps.AddList(sorted)

/** Gets all registered weapons */
export function GetList(): readonly weapon.Generator[] {
    return wps.Get()
}

/** Finds a registered weapon by its name. Case insensitive */
export function FindByName(name: string): weapon.Generator | undefined {
    return wps.Find(name)
}

/** Gets the list of weapons of a given type */
export function GetByType(type: number): weapon.Generator[] {
    return types[type] || []
}