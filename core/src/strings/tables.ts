import { Table, TableCell } from "./table"

/**
 * Converts an object of arrays to a string table.
 */
export function ObjArrTable<Obj extends { [key: string | number | symbol]: TableCell[] }>(obj: Obj): Table {
    const keys = Object.keys(obj)
    const table = new Table(...keys)

    const maxlines = Math.max(...keys.map(key => obj[key].length))
    for (let line = 0; line < maxlines; line++) {
        const row: TableCell[] = []
        for (const key of keys) {
            if (line < obj[key].length) {
                row.push(obj[key][line])
            } else {
                row.push(undefined)
            }
        }
        table.AddRow(...row)
    }

    return table
}
/**
 * Converts an array of objects to a table string
 */
export function ArrObjTable<Obj extends { [key: string | number | symbol]: TableCell }>(arr: Obj[]): Table {
    const keys: string[] = []
    for (const obj of arr) {
        const k = Object.keys(obj)
        for (const key of k) {
            if (!keys.includes(key)) {
                keys.push(key)
            }
        }
    }
    const table = new Table(...keys)
    for (const obj of arr) {
        table.AddRow(...keys.map(key => obj[key]))
    }

    return table
}