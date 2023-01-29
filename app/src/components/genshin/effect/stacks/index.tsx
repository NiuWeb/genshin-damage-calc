import { GetString } from "@src/strings/strings"
import { useContext } from "react"
import { EffectContext } from "../context"
import { EffectStacksDropdown } from "./stacks-dropdown"
import { EffectStacksInput } from "./stacks-input"

const DROPDOWN_MAX_STACKS = 20

export function EffectStacks() {
  const { effect } = useContext(EffectContext)

  if (!effect.Options.MaxStacks) {
    return null
  }

  return <div className="effect-stacks inline-flex bg-emerald-700 text-sm">
    <div className="bg-emerald-600/50 px-0.5">
      {GetString("LABEL.STACKS")}
    </div>
    <div className="border-l border-r border-emerald-800">
      {effect.Options.MaxStacks <= DROPDOWN_MAX_STACKS ? (
        <EffectStacksDropdown />
      ) : (
        <EffectStacksInput />
      )}
    </div>
    <div className="bg-emerald-600/50 px-0.5">
      {GetString("LABEL.OF_X", { vars: { x: effect.Options.MaxStacks } })}
    </div>
  </div>
}