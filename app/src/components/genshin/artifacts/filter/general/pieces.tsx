import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useContext } from "react"
import { FilterContext } from "./context"

export function Pieces() {
  const props = useContext(FilterContext)

  const title = !props.filter.pieces ? (
    GetString("LABEL.ANY")
  ) : (
    props.filter.pieces.length === 1 ? (
      GetString("ARTIFACT." + genshin.stats.piece.Name(props.filter.pieces[0]))
    ) : (
      "(" + props.filter.pieces.length + ")"
    )
  )

  function change(values: number[]) {
    if (!values || !values.length) {
      props.filter.pieces = undefined
    } else {
      props.filter.pieces = values
    }
    props.onChange?.()
  }

  return <div
    className="option flex items-center gap-1">
    {GetString("LABEL.ARTIFACT_FILTER_ONLY_PIECES")}
    <div className="bg-gray-700 p-0.5 w-[96px]">
      <Dropdown
        multiple
        className="w-full"
        title={title}
        onChange={change}
        values={props.filter.pieces || []}>
        {genshin.stats.piece.Values().map(piece => (
          <DropdownItem key={piece} value={piece}>
            {GetString("ARTIFACT." + genshin.stats.piece.Name(piece))}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  </div>
}