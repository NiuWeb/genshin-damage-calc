import { genshin } from "@src/genshin/core"

export interface ArtifactResultsProps {
    results: (genshin.optimizer.artifacts.Result | undefined)[],
    config: genshin.optimizer.artifacts.BaseConfig
}
export interface ArtifactResultsContext extends ArtifactResultsProps {
    optimizer: genshin.optimizer.artifacts.ArtifactsOptimizer
}