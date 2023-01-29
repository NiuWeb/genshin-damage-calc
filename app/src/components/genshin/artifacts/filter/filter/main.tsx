import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useContext, useReducer } from "react"
import { FilterContext } from "./context"

export function FilterMain() {
  const { filter, onChange } = useContext(FilterContext)
  const [, update] = useReducer(x => (x + 1) % 6, 0)

  const title = !filter.main || filter.main.length === 0 ? (
    GetString("LABEL.ALL")
  ) : (
    filter.main.length === 1 ? (
      GetString("STAT." + genshin.stats.stat.Name(filter.main[0]))
    ) : "(" + filter.main.length + ")"
  )

  function change(values: number[]) {
    if (values.length === 0 || values.length === genshin.stats.Mainstats.length) {
      filter.main = undefined
    } else {
      filter.main = values
    }
    onChange?.()
    update()
  }

  return <div className="filter-main flex gap-1 items-center">
    <div>
      {GetString("LABEL.ARTIFACT_MAINSTAT")}
    </div>
    <div className="bg-gray-800 p-0.5 w-[160px]">
      <Dropdown
        multiple
        values={filter.main || []}
        className="w-full"
        title={title}
        onChange={change}>
        {genshin.stats.Mainstats.map((piece) => (
          <DropdownItem key={piece} value={piece}>
            {GetString("STAT." + genshin.stats.stat.Name(piece))}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  </div>
}