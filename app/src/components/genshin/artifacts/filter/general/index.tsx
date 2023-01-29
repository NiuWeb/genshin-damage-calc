import { useReducer } from "react"
import { FilterContext } from "./context"
import { OnlyOption } from "./only-option"
import { Pieces } from "./pieces"

export function GeneralFilter(props: FilterContext) {
  const [, update] = useReducer(x => (x + 1) % 6, 0)
  function onChange() {
    props.onChange?.()
    update()
  }

  return <FilterContext.Provider value={{ filter: props.filter, onChange }}>
    <div className="general-filter flex flex-col gap-1">
      <Pieces />
      <OnlyOption option="locked" />
      <OnlyOption option="unlocked" />
    </div>
  </FilterContext.Provider>
}