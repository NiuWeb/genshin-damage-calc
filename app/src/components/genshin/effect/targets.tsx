import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { ElementBgColor } from "@src/genshin/utils/colors"
import { useCalc } from "@src/genshin/context"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useContext } from "react"
import { EffectContext } from "./context"

export function EffectTargets() {
  const { effect, update } = useContext(EffectContext)
  const [calc] = useCalc()

  const party = calc.Get().Scenario.Party
  const members = party.GetMembers()
  const targets = effect.GetTargets()
  const memberNames = members.map(box => box.GetCharacter().Options.Name)
  const targetNames = targets.map(box => box.GetCharacter().Options.Name)

  const targetComps = targets.map((box, i) => (
    <div key={i} className={classes(
      ElementBgColor(box.GetCharacter().Options.Element),
      "px-1 border-l border-l-gray-700")}>
      {GetString("ITEM." + box.GetCharacter().Options.Name)}
    </div>
  ))

  const targetIndexes = targetNames.map(target => memberNames.indexOf(target))

  function change(targetIndexes: number[]) {
    const targets = targetIndexes.map(i => members[i])
    effect.ApplyMultiple(targets)
    update()
  }

  return <div className="effect-targets inline-flex bg-neutral-700 text-sm">
    <div className="bg-neutral-600 px-0.5">
      {GetString("LABEL.APPLIES_TO")}
    </div>
    <div>
      <Dropdown
        onChange={change}
        multiple
        title={<div className="flex text-black">
          {targets.length > 0 ? (
            targetComps
          ) : (
            <span className="text-white">{GetString("LABEL.NONE")}</span>
          )}
        </div>}
        values={targetIndexes}>
        {memberNames.map((member, i) => (
          <DropdownItem key={i} value={i}>
            {GetString("ITEM." + member)}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
  </div>
}