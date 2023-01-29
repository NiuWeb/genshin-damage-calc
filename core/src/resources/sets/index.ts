import { artifact } from "@src/core"
import { MapList } from "@src/utils/lists/list"
import * as list from "./list"
export * from "./list"

const sorted = Object.values(list).sort((a, b) => {
    if (a.Stars === b.Stars) {
        return a.Name.localeCompare(b.Name)
    } else {
        return a.Stars - b.Stars
    }
})

const sets = new MapList<artifact.Set>(s => s.Name)
sets.AddList(sorted)


/** Gets all registered artifact sets */
export function GetList(): readonly artifact.Set[] {
    return sets.Get()
}

/** Finds a registered set by its name. Case insensitive */
export function FindByName(name: string): artifact.Set | undefined {
    return sets.Find(name)
}