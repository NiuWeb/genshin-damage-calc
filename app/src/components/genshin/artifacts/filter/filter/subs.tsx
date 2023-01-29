import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useContext, useReducer } from "react"
import { FilterContext } from "./context"

export function FilterSubs() {
  const { filter, onChange } = useContext(FilterContext)
  const [, update] = useReducer(x => (x + 1) % 6, 0)

  const title = !filter.subs || filter.subs.length === 0 ? (
    GetString("LABEL.ANY")
  ) : (
    filter.subs.length === 1 ? (
      GetString("STAT." + genshin.stats.stat.Name(filter.subs[0]))
    ) : "(" + filter.subs.length + ")"
  )

  function change(values: number[]) {
    if (values.length === 0 || values.length === genshin.stats.Substats.length) {
      filter.subs = undefined
    } else {
      filter.subs = values
    }
    onChange?.()
    update()
  }

  function changeMode([mode]: number[]) {
    if (!Number.isFinite(mode)) {
      filter.subsMode = undefined
    } else if (mode === 0) {
      filter.subsMode = "some"
    } else if (mode === 1) {
      filter.subsMode = "every"
    }
    onChange?.()
    update()
  }

  return <div className="filter-main flex gap-1 items-center">
    <div>
      {GetString("LABEL.ARTIFACT_SUBSTATS")}
    </div>
    <div className="flex">
      <div className="bg-gray-800 p-0.5 w-[160px]">
        <Dropdown
          max={4}
          multiple
          values={filter.subs || []}
          className="w-full"
          title={title}
          onChange={change}>
          {genshin.stats.Substats.map((piece) => (
            <DropdownItem key={piece} value={piece}>
              {GetString("STAT." + genshin.stats.stat.Name(piece))}
            </DropdownItem>
          ))}
        </Dropdown>
      </div>
      <div className="bg-gray-900 p-0.5">
        <Dropdown
          values={[filter.subsMode === "every" ? 1 : 0]}
          className="w-full"
          onChange={changeMode}
          title={GetString("LABEL.MODE_" + (filter.subsMode || "some").toUpperCase())}>
          {["some", "every"].map((mode, i) => (
            <DropdownItem key={i} value={i}>
              {GetString("LABEL.MODE_" + mode.toUpperCase())}
            </DropdownItem>
          ))}
        </Dropdown>
      </div>
    </div>
  </div>
}