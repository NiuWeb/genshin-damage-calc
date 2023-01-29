import { Checkbox } from "@src/components/checkbox/checkbox"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useContext } from "react"
import { FilterContext } from "./context"

export function OnlyOption({ option }: { option: genshin.store.GeneralFilter["only"] }) {
  const props = useContext(FilterContext)

  if (!option) { return null }

  function change() {
    props.filter.only = (props.filter.only === option) ? undefined : option
    props.onChange?.()
  }

  return <div
    onClick={change}
    className="option flex items-center gap-1 hover:cursor-pointer">
    <Checkbox checked={props.filter.only === option} />
    {GetString("LABEL.ARTIFACT_FILTER_ONLY_" + option.toUpperCase())}
  </div>
}