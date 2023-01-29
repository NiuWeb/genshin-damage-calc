import { genshin } from "@src/genshin/core"
import { createContext } from "react"

export interface FilterContext {
    filter: genshin.store.ArtifactFilter
    onChange?(): void
}

export const FilterContext = createContext({} as FilterContext)