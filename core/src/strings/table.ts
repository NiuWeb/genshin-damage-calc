export type TableCell = null | undefined | string | number | symbol | { toString(): string }

/** A table stores data and converts it into a single string */
export class Table {
    /** 
     * Creates a string table
     * @param headers the headers row
     */
    constructor(...headers: TableCell[]) {
        this.rows = [headers]
        this.n_cols = headers.length
    }
    /** decimal places to format numbers */
    DecimalPlaces = 2
    /** whether to insert "====" below headers */
    HeaderLine = true
    private rows: TableCell[][]
    private n_cols: number

    /** Adds a row to the table */
    AddRow(...cells: TableCell[]): Table {
        while (cells.length < this.n_cols) {
            cells.push("")
        }
        this.rows.push(cells)
        return this
    }
    /** gets the table headers */
    GetHeaders(): TableCell[] {
        return this.rows[0]
    }
    /** gets all the rows in the table */
    GetRows(): TableCell[][] {
        return this.rows.slice(1)
    }
    toString(): string {
        return this.String()
    }
    /** Converts the table to string */
    String(): string {
        const cols = this.n_cols
        const rows = this.rows.length
        const strtable: string[] = []
        const maxlens: number[] = []

        // convert all values to string and place them in the 1d array
        for (let col = 0; col < cols; col++) {
            let maxlen = 0
            for (let row = 0; row < rows; row++) {
                const item = this.rows[row][col]
                let str: string
                if (typeof item === "number") {
                    str = item.toFixed(this.DecimalPlaces)
                } else {
                    str = item?.toString() || ""
                }
                if (str.length > maxlen) {
                    maxlen = str.length
                }
                strtable[row * cols + col] = str
            }
            maxlens[col] = maxlen
        }

        // fill the shortest strings with spaces to make all of the same size
        for (let col = 0; col < cols; col++) {
            for (let row = 0; row < rows; row++) {
                const maxlen = maxlens[col]
                while (strtable[row * cols + col].length < maxlen) {
                    strtable[row * cols + col] += " "
                }
            }
        }
        // put strings into a single string
        let result = ""
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                result += strtable[row * cols + col] + " | "
            }
            if (this.HeaderLine && row === 0) {
                result += "\n"
                const l = result.length
                for (let i = 0; i < l; i++) {
                    result += "-"
                }
            }
            result += "\n"
        }
        return result
    }

    /**
     * Removes the entire column at the given index
     */
    RemoveColumn(index: number): Table {
        for (const row of this.rows) {
            row.splice(index, 1)
        }
        this.n_cols--
        return this
    }

    /**
     * Removes multiple columns
     */
    RemoveColumns(...indexes: number[]): Table {
        indexes.sort((a, b) => b - a)
        for (const index of indexes) {
            this.RemoveColumn(index)
        }
        return this
    }

    /**
     * Removes all columns that are empty
     */
    RemoveEmptyColumns(): Table {
        const cols = this.n_cols
        for (let col = cols - 1; col >= 0; col--) {
            let empty = true
            for (let row = 1; row < this.rows.length; row++) {
                if (this.rows[row][col]) {
                    empty = false
                    break
                }
            }
            if (empty) {
                this.RemoveColumn(col)
            }
        }
        return this
    }

    /**
     * Serializes the table into a 2d array of strings
     */
    Serialize(): string[][] {
        return this.rows.map(row => row.map(cell => String(cell).valueOf() || ""))
    }

    /**
     * Deserializes a 2d array of strings into a table
     */
    static Deserialize(data: string[][]): Table {
        const headers = data.shift() || []
        const table = new Table(...headers)
        for (const row of data) {
            table.AddRow(...row)
        }
        return table
    }
}