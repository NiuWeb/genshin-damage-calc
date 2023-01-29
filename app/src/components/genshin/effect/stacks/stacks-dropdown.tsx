import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { useContext } from "react"
import { EffectContext } from "../context"

export function EffectStacksDropdown() {
  const { effect, update } = useContext(EffectContext)

  const allStacks = Array.from(Array(effect.Options.MaxStacks + 1)).map((_, i) => i)
  const stacks = effect.GetStacks()

  function change(newstacks: number) {
    if (stacks === newstacks) { return }
    effect.SetStacks(newstacks || 0)
    update()
  }

  return <Dropdown
    notEmpty
    className="px-1"
    onChange={([stacks]) => change(stacks)}
    title={<span>{stacks}</span>}
    values={[stacks]}>
    {allStacks.map(stack => (
      <DropdownItem value={stack} key={stack}>
        {stack}
      </DropdownItem>
    ))}
  </Dropdown>
}