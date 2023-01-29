import { genshin } from "@src/genshin/core"
import { useContext, useReducer } from "react"
import { FilterCard } from "../../substats/config/filter"
import { ArtifactsConfigContext } from "./context"

export function Filter() {
  const [, update] = useReducer(x => (x + 1) % 6, 0)
  const { config, onChange } = useContext(ArtifactsConfigContext)

  function change(filters: genshin.optimizer.filter.Filter[]) {
    config.filter = filters
    onChange?.(config)
    update()
  }
  return <FilterCard filters={config.filter} onChange={change} />
}