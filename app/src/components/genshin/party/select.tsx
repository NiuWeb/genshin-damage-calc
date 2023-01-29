import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { useCalc } from "@src/genshin/context"
import { GetString } from "@src/strings/strings"
import { ElementIcon } from "../auras/icon"

export function PartySelect() {
  const [calc, exec] = useCalc()

  const scenario = calc.Get().Scenario
  const members = scenario.Party.GetMembers()
  const character = scenario.Character
  const index = character ? members.indexOf(character) : -1

  const title = character ?
    GetString("ITEM." + character.GetCharacter().Options.Name) :
    GetString("LABEL.NONE")

  function change([index]: number[]) {
    if (!Number.isFinite(index)) { return }
    exec(() => scenario.Character = members[index] || undefined)
  }

  return <Dropdown
    className="bg-slate-600"
    notEmpty
    onChange={change}
    values={[index]}
    title={title}>
    {members.length > 0 ? (
      members.map((member, i) => (
        <DropdownItem key={i} value={i}>
          <div className="flex gap-1 items-center">
            <ElementIcon element={member.GetCharacter().Options.Element} />
            <span>{GetString("ITEM." + member.GetCharacter().Options.Name)}</span>
          </div>
        </DropdownItem>
      ))
    ) : (
      <DropdownItem value={-1}>
        {GetString("LABEL.NONE")}
      </DropdownItem>
    )}
  </Dropdown>
}