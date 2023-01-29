import { genshin } from "@src/genshin/core"
import { createContext } from "react"

export interface StoredProps {
    artifact: genshin.utils.ReadOnly<genshin.artifact.Exported>
    store: genshin.store.ArtifactStore
    onChange?(): void
}
export interface StoredContext extends StoredProps {
    real: genshin.artifact.Artifact
}

export const StoredContext = createContext({} as StoredContext)