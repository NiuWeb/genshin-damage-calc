import { useEffect, useReducer, useState } from "react"

export function usePagination<T>(items: readonly T[], _pageSize?: number) {
    const pageSize = _pageSize || 20
    const pages = Math.max(1, Math.ceil(items.length / pageSize))
    const [pageItems, setPageItems] = useState<T[]>([])
    const [page, setPage] = useState(1)
    const [updated, update] = useReducer(x => (x + 1) % 6, 0)

    if (page > pages) {
        setPage(1)
    }

    useEffect(() => {
        const slice = items.slice((page - 1) * pageSize, page * pageSize)
        setPageItems(slice)
    }, [items, pageSize, page, updated])


    return {
        Update() {
            update()
        },
        Get() {
            return pageItems
        },
        pages,
        page,
        Next() {
            setPage(page => {
                page += 1
                if (page > pages) {
                    page = 1
                }
                return page
            })
        },
        Prev() {
            setPage(page => {
                page -= 1
                if (page < 1) {
                    page = pages - page
                }
                return page
            })
        },
        Goto(page: number) {
            setPage(Math.max(1, Math.min(pages, page)))
        }
    }
}