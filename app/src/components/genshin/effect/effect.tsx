import { Markdown } from "@src/components/markdown/markdown"
import { GetString } from "@src/strings/strings"
import { useReducer } from "react"
import { ExclamationCircle } from "react-bootstrap-icons"
import { EffectAuras } from "./auras"
import { EffectCondition } from "./condition"
import { EffectContext, EffectProps } from "./context"
import { EffectHeader } from "./header"
import { EffectStacks } from "./stacks"
import { EffectTargets } from "./targets"

export function EffectCard(props: EffectProps) {
  const [, update] = useReducer(x => (x + 1) % 7, 0)

  const context: EffectContext = {
    ...props,
    update() {
      props.onChange?.()
      update()
    }
  }

  return <div className="effect bg-slate-700">
    <EffectContext.Provider value={context}>
      <EffectHeader />
      <div className="effect-settings p-1 flex flex-col gap-0.5">
        <div className="flex justify-center">
          <EffectStacks />
        </div>
        <div className="flex justify-center">
          <EffectAuras />
        </div>
        <div className="flex justify-center">
          <EffectCondition />
        </div>
      </div>
      <div className="effect-description px-1 text-sm">
        <Markdown linebreak>
          {GetString("ITEM." + props.effect.Options.Name, {
            description: true,
            templates: {
              rank: props.effect.GetRank()
            }
          })}
        </Markdown>
      </div>
      <div className="effect-settings p-1 flex flex-col gap-1">
        <div className="flex justify-center">
          <EffectTargets />
        </div>
        {props.effect.Options.ApplyOther ? (
          <div className="flex justify-center">
            <div className="p-0.5 bg-neutral-400 text-xs flex gap-0.5 items-center text-black">
              <ExclamationCircle />
              {GetString("LABEL.EFFECT_PARTY")}
            </div>
          </div>
        ) : null}
      </div>
    </EffectContext.Provider>
  </div>
}