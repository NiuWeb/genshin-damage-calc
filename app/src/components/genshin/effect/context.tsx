import { genshin } from "@src/genshin/core"
import { createContext } from "react"

export interface EffectProps {
  effect: genshin.effect.Effect
  onChange?(): void
}
export interface EffectContext extends EffectProps {
  update(): void
}

export const  EffectContext = createContext({} as EffectContext)