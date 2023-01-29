import { GetString } from "@src/strings/strings"
import { useContext } from "react"
import { AuraSelect } from "../auras/select"
import { EffectContext } from "./context"

export function EffectAuras() {
  const { effect, update } = useContext(EffectContext)

  function change(auras: readonly number[]) {
    effect.SetAuras(...auras)
    update()
  }

  if (effect.Options.MaxAuras === 0) {
    return null
  }

  return <div className="effect-stacks inline-flex text-sm">
    <div className=" bg-neutral-600 px-0.5 flex items-center">
      {GetString("LABEL.AURA")}
    </div>
    <div className="bg-neutral-700 flex items-center">
      <AuraSelect
        valid={effect.Options.ValidAuras}
        max={effect.Options.MaxAuras}
        auras={effect.GetAuras()}
        onChange={change} />
    </div>
  </div>
}