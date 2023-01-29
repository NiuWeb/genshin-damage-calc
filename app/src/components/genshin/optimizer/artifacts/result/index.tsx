import { genshin } from "@src/genshin/core"
import { ArtifactResultsContext } from "./context"
import { Result } from "./result"

export function ArtifactResults(props: {
  results: (genshin.optimizer.artifacts.Result | undefined)[],
  config: genshin.optimizer.artifacts.BaseConfig
}) {

  const optimizer = new genshin.optimizer.artifacts.ArtifactsOptimizer()
  optimizer.SetConfig(props.config)


  return <ArtifactResultsContext.Provider value={{ ...props, optimizer }}>
    <div className="flex flex-col gap-1">
      {props.results.map((r, i) => (
        r && <Result key={i} result={r} />
      ))}
    </div>
  </ArtifactResultsContext.Provider>
}