import { toPlaces } from "@src/utils/number"
import { genshin } from "../core"

/** formats a stat to integer or percentage */
export function printStat(stat: number, value: number, places = 2): string {
    if (!genshin.stats.FlatStats.includes(stat)) {
        return toPlaces(value * 100, places) + "%"
    }
    return toPlaces(value, 0)
}