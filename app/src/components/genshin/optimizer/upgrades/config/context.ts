import { genshin } from "@src/genshin/core"
import { createContext } from "react"

export interface UpgradesConfigProps {
    config: genshin.optimizer.upgrades.BaseConfig
    onChange?(config: genshin.optimizer.upgrades.BaseConfig): void
}

export const UpgradesConfigContext = createContext<UpgradesConfigProps>({} as UpgradesConfigProps)
