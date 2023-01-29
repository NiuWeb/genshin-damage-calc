import { NumberField } from "@src/components/number-field/number-field"
import { useContext } from "react"
import { EffectContext } from "../context"

export function EffectStacksInput() {
  const { effect, update } = useContext(EffectContext)

  const stacks = effect.GetStacks()

  function change(newstacks: number) {
    if (stacks === newstacks) { return }
    effect.SetStacks(newstacks || 0)
    update()
  }

  return <NumberField
    className="bg-transparent w-[48px] px-1 text-right"
    value={stacks}
    places={0}
    onChange={change} />
}