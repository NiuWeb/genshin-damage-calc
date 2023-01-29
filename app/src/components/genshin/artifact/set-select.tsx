import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItemEmpty } from "@src/components/dropdown/item-empty"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { StarsBgColor } from "@src/genshin/utils/colors"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { StarFill } from "react-bootstrap-icons"

const allSets = genshin.sets.GetList()

export function SetSelect({ set, onChange, disabled }: {
  set: string | undefined,
  onChange?(set: string | undefined): void
  disabled?: boolean
}) {
  const current = set ? genshin.sets.FindByName(set) : undefined
  const value = current ? [allSets.indexOf(current)] : []

  function change([next]: number[]) {
    if (next === undefined || next === null || value.includes(next)) {
      return
    }
    onChange?.(allSets[next].Name)
  }
  const id = Math.random().toString(36)
  return <Dropdown
    disabled={disabled}
    className="w-full"
    onChange={change}
    title={stringSetName(current?.Name || "")}
    values={value}>
    {allSets.map((set, i) => (
      <DropdownItemEmpty key={i} value={i} tooltip={id + "-" + i}>
        <div className={classes(
          StarsBgColor(set.Stars),
          " text-black"
        )}>
          <div className={classes(
            "flex gap-1 items-center p-1",
            "hover:bg-black/25 hover:cursor-pointer",
            value.includes(i) ? "bg-white/25" : ""
          )}>
            {set.Stars}
            <StarFill />
            {GetString("ITEM." + set.Name)}
          </div>
        </div>
        <Tooltip id={id + "-" + i}>
          {set.Name}
        </Tooltip>
      </DropdownItemEmpty>
    ))}
  </Dropdown>
}


function findSetName(name: string | undefined) {
  if (!name) { return undefined }
  const set = genshin.sets.FindByName(name)
  if (!set) { return name }
  return set.Name
}
function stringSetName(name: string | undefined) {
  const found = findSetName(name)
  if (!found) {
    return GetString("LABEL.ARTIFACT_SET_NONE")
  }
  return GetString("ITEM." + found)
}