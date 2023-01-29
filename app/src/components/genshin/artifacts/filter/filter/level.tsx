import { NumberField } from "@src/components/number-field/number-field"
import { GetString } from "@src/strings/strings"
import { useContext, useReducer } from "react"
import { FilterContext } from "./context"

export function FilterLevel() {
  const { filter, onChange } = useContext(FilterContext)
  const [, update] = useReducer(x => (x + 1) % 6, 0)

  function change(value: number) {
    filter.level = Math.max(0, Math.min(20, value))
    onChange?.()
    update()
  }

  return <div className="filter-level flex gap-1 items-center">
    <div>
      {GetString("STAT.LEVEL")}
    </div>
    <div className="bg-gray-800 p-0.5">
      <NumberField
        className="bg-transparent w-[32px]"
        onChange={change}
        value={filter.level || 0} />
    </div>
  </div>
}