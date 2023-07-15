import { genshin } from "@bygdle/genshin-calculator-core"
import { StarsBgColor } from "@src/genshin/utils/colors"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"

const allPieces = genshin.stats.piece.Values().map(p => genshin.stats.piece.Name(p))
const allStats = genshin.stats.stat.Values().map(s => genshin.stats.stat.Name(s))

export type HeaderType = "weapon" | "condition" | "set" | "piece" | "stat" | "other"

/**
 * Classifies a header by its name
 */
export function getHeaderType(header: string): HeaderType {
    switch (header) {
        case "WEAPON": return "weapon"
        case "SET": return "set"
        case "CONDITION": return "condition"
    }
    if (allPieces.includes(header)) return "piece"
    if (allStats.includes(header)) return "stat"
    return "other"
}

/**
 * Gets the display name of a header
 */
export function mapHeader(header: string): string {
    const type = getHeaderType(header)
    switch (type) {
        case "weapon":
        case "set":
        case "other":
        case "condition":
            return GetString("LABEL." + header)
        case "piece":
            return GetString("ARTIFACT." + header)
        case "stat":
            return GetString("STAT." + header)
    }
}
/**
 * Gets the display content of a cell
 */
export function mapCell(cell: string, header: string) {
    if (!cell) {
        return ""
    }
    const type = getHeaderType(header)
    switch (type) {
        default:
            return mapCellNormal(cell)
        case "weapon":
            return mapCellWeapon(cell)
        case "set":
            return mapCellSet(cell)
        case "piece":
            return mapCellNormal(GetString("STAT." + cell))
        case "condition":
            return mapCellNormal(GetString("CONDITION." + cell.toUpperCase()))
    }
}
/**
 * Gets the display content of a normal cell
 */
function mapCellNormal(cell: string) {
    return <div className="text-center px-2 whitespace-nowrap">
        {cell}
    </div>
}

/**
 * Gets the display content of a weapon cell
 */
function mapCellWeapon(cell: string) {
    const match = cell.match(/(.*?)\(R(\d+)\)/)
    const name = (match?.[1] || cell).trim()
    const weapon = genshin.weapons.FindByName(name)
    if (!weapon) {
        return cell
    }
    const rank = match?.[2] || 1
    return <div className={classes("px-2 py-1 text-black whitespace-nowrap", StarsBgColor(weapon.Stars))}>
        {GetString("ITEM." + weapon.Name) + ` (R${rank})`}
    </div>
}

/**
 * Gets the display content of a set cell
 */
export function mapCellSet(cell: string) {
    cell = cell.replace(/\s/g, "").trim()
    const parts = cell.split("+")
    const result = parts.map(part => {
        const match = part.match(/(.*)\((\d+)\)/)
        const name = (match?.[1] || part).trim()
        const number = match?.[2] || 2

        const set = genshin.sets.FindByName(name)
        if (!set) {
            return part
        }
        return GetString("ITEM." + set.Name) + ` (${number})`
    })

    return <div className="px-2 py-1 whitespace-nowrap text-center">
        {result.join(" + ")}
    </div>
}