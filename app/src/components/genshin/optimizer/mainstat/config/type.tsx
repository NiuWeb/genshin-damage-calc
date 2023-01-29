import { genshin } from "@src/genshin/core"

export interface MainstatConfigProps {
  config: genshin.optimizer.mainstat.BaseConfig
  onChange?(config: genshin.optimizer.mainstat.BaseConfig): void
}
