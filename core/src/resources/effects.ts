import * as characters from "./characters"
import * as weapons from "./weapons"
import * as sets from "./sets"
import * as resonances from "./resonances"
import { effect } from "@src/core"
import { MapList } from "@src/utils/lists/list"

const effects = new MapList<effect.Generator>(ef => ef.Name)

for (const char of characters.GetList()) {
    char.Effects.forEach(ef => effects.Add(ef))
}

for (const wp of weapons.GetList()) {
    wp.Effects.forEach(ef => effects.Add(ef))
}
for (const set of sets.GetList()) {
    set.Piece2.forEach(ef => effects.Add(ef))
    set.Piece4.forEach(ef => effects.Add(ef))
}
for (const ef of resonances.GetList()) {
    effects.Add(ef)
}

/** gets the list of all registered effects */
export function GetList(): readonly effect.Generator[] {
    return effects.Get()
}

/** finds an effect by its name, case insensitive */
export function FindByName(name: string): effect.Generator | undefined {
    return effects.Find(name)
}