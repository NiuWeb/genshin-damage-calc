import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useContext, useReducer } from "react"
import { ArtifactsConfigContext } from "./context"

const allSets = genshin.sets.GetList().map(s => s.Name)

export function AllowOnly() {
  const { config, onChange } = useContext(ArtifactsConfigContext)
  const [, update] = useReducer(x => (x + 1) % 6, 0)

  const title = (() => {
    if (!config.allowOnly) {
      return GetString("LABEL.ANY")
    }
    if (config.allowOnly.length === 1) {
      return GetString("ITEM." + config.allowOnly[0])
    } else {
      return "(" + config.allowOnly.length + ")"
    }
  })()

  const values = (() => {
    if (!config.allowOnly) {
      return []
    } else {
      return config.allowOnly.map(name => allSets.indexOf(name))
    }
  })()

  function change(values: number[]) {
    if (!values.length) {
      config.allowOnly = undefined
    } else {
      config.allowOnly = values.map(i => allSets[i])
    }
    onChange?.(config)
    update()
  }

  return <div className="flex gap-1 items-center">
    {GetString("OPTIMIZER.ARTIFACTS_ALLOW_ONLY")}

    <Dropdown
      multiple
      onChange={change}
      title={title}
      values={values}
      className="bg-slate-600 px-1 min-w-[64px]">
      {allSets.map((set, i) => (
        <DropdownItem key={i} value={i}>
          {GetString("ITEM." + set)}
        </DropdownItem>
      ))}
    </Dropdown>
  </div>
}