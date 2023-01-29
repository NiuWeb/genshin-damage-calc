import { stat } from "@core/stats"
import { Generator } from "@core/effect"
import * as list from "./list"
export * from "./list"

/** A list of effect generators corresponding to elemental resonances */
const Resonances = {
    [stat.PYRO_DMG]: list.Pyro,
    [stat.HYDRO_DMG]: list.Hydro,
    [stat.CRYO_DMG]: list.Cryo,
    [stat.GEO_DMG]: list.Geo,
    [stat.DENDRO_DMG]: list.Dendro,
}
const result: Generator[] = []
for (const list of Object.values(Resonances)) {
    list.forEach(l => result.push(l))
}

/** Gets the list of registered resonances */
export function GetList(): readonly Generator[] {
    return result
}
/** Finds an elemental resonance by its element */
export function FindByElement(element: number): readonly Generator[] | undefined {
    return Resonances[element]
}