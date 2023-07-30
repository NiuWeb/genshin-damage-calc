import { Checkbox } from "@src/components/checkbox/checkbox"
import { GetString } from "@src/strings/strings"
import { useContext, useReducer } from "react"
import { UpgradesConfigContext } from "./context"

const criteria = ["damage", "cost", "efficiency"] as const

export function CriteriaConfig() {
  const { config, onChange } = useContext(UpgradesConfigContext)
  const [, update] = useReducer(x => (x + 1) % 7, 0)
  function set(criteria: typeof config.criteria) {
    config.criteria = criteria
    onChange?.(config)
    update()
  }

  return <div className="flex flex-col gap-1">
    <h4 className="text-lg font-bold">
      {GetString("OPTIMIZER.CRITERIA")}
    </h4>
    {criteria.map((crit, i) => (
      <div key={i} className="flex flex-row gap-1 items-center">
        <Checkbox
          checked={config.criteria === crit}
          onChange={() => set(crit)} />
        <div>
          {GetString("OPTIMIZER.UPGRADES.CRITERIA." + crit.toUpperCase())}
        </div>
      </div>
    ))}
  </div>
}