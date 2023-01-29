/** 
 * Simple NxM grid implemented using a map
 * for N,M < 2^16
 */
export class Grid<Value> {
    constructor(readonly rows: number) { }
    private values = new Map<number,Value>() 

    Get(row: number, column: number): Value {
        const value = this.values.get(Grid.dohash(row, column))
        if (value === undefined) {
            throw new Error(`Undefined value at position {${row}, ${column}}`)
        }
        return value
    }
    GetNullable(row: number, column: number): Value | undefined {
        return this.values.get(Grid.dohash(row, column))
    }
    Set(row: number, column: number, value: Value): void {
        this.values.set(Grid.dohash(row, column), value)
    }
    ForEach(loop: GridLoop<Value>): void {
        for (const [hash, value] of this.values) {
            const [row, col] = Grid.undohash(hash)
            loop(value, row, col)
        }
    }

    static dohash(row: number, col: number): number { 
        return row << 16 | col
    }
    static undohash(hash: number): [row: number, col: number] {
        const row = hash >> 16
        const col = hash ^ (row << 16)
        return [row, col]
    }
}

export type GridLoop<Value> = (value: Value, row: number, column: number) => void