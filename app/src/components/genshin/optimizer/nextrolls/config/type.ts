import { genshin } from "@src/genshin/core"

export interface NextRollConfigProps {
    config: genshin.optimizer.nextroll.BaseConfig
    onChange?(config: genshin.optimizer.nextroll.BaseConfig): void
}