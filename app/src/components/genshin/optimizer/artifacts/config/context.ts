import { genshin } from "@src/genshin/core"
import { createContext } from "react"

export interface ArtifactsConfigProps {
    config: genshin.optimizer.artifacts.BaseConfig
    onChange?(config: genshin.optimizer.artifacts.BaseConfig): void
}

export const ArtifactsConfigContext = createContext({} as ArtifactsConfigProps)