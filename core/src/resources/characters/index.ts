import { charbox } from "@src/core"
import { MapList } from "@src/utils/lists/list"
import * as list from "./list"
export * from "./list"

const chars = new MapList<charbox.Generator>(c => c.Name)
chars.AddList(
    Object.values(list)
        .sort((a, b) => a.Name.localeCompare(b.Name))
)

/** Gets all registered characters */
export function GetList(): readonly charbox.Generator[] {
    return chars.Get()
}

/** Finds a registered character by its name. Case insensitive */
export function FindByName(name: string): charbox.Generator | undefined {
    return chars.Find(name)
}