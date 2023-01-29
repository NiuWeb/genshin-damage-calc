import { genshin } from "@src/genshin/core"
import { createContext } from "react"

export interface SubstatsConfigProps {
    config: genshin.optimizer.substats.BaseConfig
    onChange?(config: genshin.optimizer.substats.BaseConfig): void
}

export const SubstatsConfigContext = createContext({} as SubstatsConfigProps)