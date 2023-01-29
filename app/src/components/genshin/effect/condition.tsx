import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { GetString } from "@src/strings/strings"
import { useContext } from "react"
import { EffectContext } from "./context"

export function EffectCondition() {
  const { effect, update } = useContext(EffectContext)

  const conditions = effect.Options.Conditions
  if (conditions.length === 0) {
    return null
  }
  const max = effect.Options.MaxConditions
  const selected = effect.GetConditions()
  const selectedIndexes = selected.map(cond => conditions.indexOf(cond))

  function change(indexes: number[]) {
    const selected = indexes.map(i => conditions[i])
    effect.SetConditions(...selected)
    update()
  }

  const title = <>
    {selected.length > 0 ? (
      selected.map(cond => GetString("CONDITION." + cond)).join(", ")
    ) : GetString("LABEL.NONE")}
  </>
  const id = Math.random().toString(36)

  return <div className="effect-stacks inline-flex text-sm">
    <div className=" bg-blue-500 px-0.5 flex items-center">
      {GetString("LABEL.CONDITIONS")}
    </div>
    <div className="bg-blue-600 flex items-center">
      <Dropdown
        max={max}
        multiple
        onChange={change}
        title={title}
        values={selectedIndexes}>
        {conditions.map((cond, i) => (
          <DropdownItem key={i} value={i}>
            <span data-tooltip={id + cond}>{GetString("CONDITION." + cond)}</span>
            <Tooltip id={id + cond}>{cond}</Tooltip>
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  </div>
}