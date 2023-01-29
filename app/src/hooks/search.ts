import { search } from "@bygdle/search-js"
import { useMemo, useState } from "react"

export type UseSearch<Value> = Omit<search.SearchProps<Value>, "search"> & { defaultValue?: search.SearchItem }
export function useSearch<Value>(props: UseSearch<Value>) {
    const [query, setQuery] = useState<search.SearchItem | undefined>(props.defaultValue)
    const result = useMemo(() => {
        const result = search.Search({
            ...props,
            search: query || "",
        })
        return result.values
    }, [query, props.values, props.ignoreCase, props.exact, props.mode])

    return {
        Get(): Value[] {
            return result
        },
        Set(query: search.SearchItem | undefined): void {
            setQuery(query)
        },
        Query() {
            return query || ""
        }
    }
}