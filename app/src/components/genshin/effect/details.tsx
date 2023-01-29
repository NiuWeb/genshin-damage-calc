import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { EffectOwner } from "./owner"

export function EffectDetails({ effect }: { effect: genshin.effect.Effect }) {
  const targets = effect.GetTargets().map(target => (
    [target.GetCharacter().Options.Name, effect.TargetRegister(target)] as [string, string | undefined]
  ))

  return targets.length ? (
    <div className="effect-details flex flex-col gap-1">
      <div className="flex justify-center">
        <EffectOwner effect={effect} />
      </div>
      {targets.map(([target, detail], i) => (
        <div key={i} className="target-details ">
          <div className="bg-neutral-700 p-1">{GetString("ITEM." + target)}</div>
          <pre className="bg-neutral-900 p-1 overflow-auto">{detail}</pre>
        </div>
      ))}
    </div>
  ) : (
    <span>{GetString("LABEL.DETAILS_NONE")}</span>
  )
}