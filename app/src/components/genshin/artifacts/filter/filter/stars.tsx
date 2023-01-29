import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { GetString } from "@src/strings/strings"
import { useContext, useReducer } from "react"
import { StarFill } from "react-bootstrap-icons"
import { FilterContext } from "./context"

export function FilterStars() {
  const { filter, onChange } = useContext(FilterContext)
  const [, update] = useReducer(x => (x + 1) % 6, 0)

  const title = <div className="flex items-center gap-1">
    {filter.stars || 4}
    <StarFill />
  </div>

  function change([stars]: number[]) {
    filter.stars = stars || 4
    onChange?.()
    update()
  }

  return <div className="filter-stars flex gap-1 items-center">
    <div>
      {GetString("LABEL.ARTIFACT_STARS")}
    </div>
    <div className="bg-gray-800 p-0.5 w-[64px]">
      <Dropdown
        notEmpty
        values={[filter.stars || 4]}
        className="w-full"
        title={title}
        onChange={change}>
        {[4, 5].map(stars => (
          <DropdownItem key={stars} value={stars}>
            <div className="flex items-center gap-1">
              {stars} <StarFill />
            </div>
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  </div>
}