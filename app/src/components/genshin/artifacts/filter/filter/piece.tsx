import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useContext, useReducer } from "react"
import { FilterContext } from "./context"

export function FilterPiece() {
  const { filter, onChange } = useContext(FilterContext)
  const [, update] = useReducer(x => (x + 1) % 6, 0)

  const title = !filter.pieces || filter.pieces.length === 0 ? (
    GetString("LABEL.ALL")
  ) : (
    GetString("ARTIFACT." + genshin.stats.piece.Name(filter.pieces[0]))
  )

  function change(values: number[]) {
    if (values.length === 0 || values.length === genshin.stats.piece.Length()) {
      filter.pieces = undefined
    } else {
      filter.pieces = values
    }
    onChange?.()
    update()
  }

  return <div className="filter-piece flex gap-1 items-center">
    <div>
      {GetString("LABEL.ARTIFACT_FILTER_TARGET")}
    </div>
    <div className="bg-gray-800 p-0.5 w-[96px]">
      <Dropdown
        values={filter.pieces || []}
        className="w-full"
        title={title}
        onChange={change}>
        {genshin.stats.piece.Values().map((piece) => (
          <DropdownItem key={piece} value={piece}>
            {GetString("ARTIFACT." + genshin.stats.piece.Name(piece))}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  </div>
}