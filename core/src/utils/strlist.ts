/**
 * Given a string in the form `"A,B,C;X,Z,Y;U,V,W"`, returns a 2D array of strings:
 * ```
 * [
 *  ["A", "B", "C"],
 *  ["X", "Z", "Y"],
 *  ["U", "V", "W"]
 * ]
 * ```
 * 
 * @param strlist The string to split
 * @param map A function to map each cell of the 2D array
 * @returns A 2D array of mapped cells
 */
export function SplitString2D<T = string>(strlist: string, map: (cell: string) => T): T[][] {
    return strlist
        .split(";")
        .map(row => {
            const cells = row.split(",")
                .map(cell => splitCellRange(cell))
                .flat()

            return cells.map(map)
        })
}

/**
 * If a cell has the form `A:B`, returns an array of numbers from `A` to `B` (inclusive).
 * In the form `A:B:C`, `C` is the step size.
 * Otherwise, returns an array with the cell as the only element.
 */
function splitCellRange(cell: string) {
    const range = cell.split(":") // [start, end, step]
    if (range.length === 1) { // no range
        return [cell]
    } else if (range.length === 2) { // range with step = 1
        const [start, end] = range.map(x => {
            const int = parseInt(x)
            if(!Number.isFinite(int)) throw new Error("Invalid range")
            return int
        })
        return Array.from(
            { length: end - start + 1 },
            (_, i) => (i + start) + ""
        )
    } else if (range.length === 3) { // range with defined step
        const [start, end, step] = range.map(x => {
            const int = parseInt(x)
            if(!Number.isFinite(int)) throw new Error("Invalid range")
            return int
        })
        return Array.from(
            { length: Math.floor((end - start) / step) + 1 },
            (_, i) => (i * step + start) + ""
        )
    } else {
        throw new Error("Invalid range")
    }
}