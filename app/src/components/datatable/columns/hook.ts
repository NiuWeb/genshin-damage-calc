import { ReactNode, useEffect, useState } from "react"

export type SelectedColumns = ReturnType<typeof useColumns>
export function useColumns(columns: ReactNode[]) {
    const [selected, setSelected] = useState<number[]>([])
    useEffect(() => {
        if (selected.length === 0 && columns.length === 0) {
            return
        }
        setSelected(columns.map((_, i) => i))
    }, [columns])

    return {
        all() {
            return columns
        },
        selected() {
            return columns.filter((_, i) => selected.includes(i))
        },
        indexes() {
            return selected
        },
        set(index: number[]) {
            setSelected([...index])
        },
        /**
         * Filters a list of items based on the selected columns
         * @param items Items to filter
         */
        items(items: ReactNode[]) {
            return columns
                .map((_, i) => i)
                .filter(i => selected.includes(i))
                .map(i => items[i])
        },
        /**
         * Gets the index of a column
         */
        index(column: ReactNode) {
            return columns.indexOf(column)
        }
    }
}