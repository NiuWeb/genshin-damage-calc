import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"

export function EffectOwner({ effect }: { effect: genshin.effect.Effect }) {

  return <div className="effect-owner inline-flex bg-neutral-500 text-sm">
    <div className="bg-neutral-600 px-0.5">
      {GetString("LABEL.OWNER")}
    </div>
    <div>
      {GetString("ITEM." + effect.Owner.GetCharacter().Options.Name)}
    </div>
  </div>
}