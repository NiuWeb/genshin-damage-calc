import Pyro from "./icons/pyro.svg"
import Hydro from "./icons/hydro.svg"
import Cryo from "./icons/cryo.svg"
import Electro from "./icons/electro.svg"
import Geo from "./icons/geo.svg"
import Anemo from "./icons/anemo.svg"
import Dendro from "./icons/dendro.svg"
import { genshin } from "@src/genshin/core"
import { DetailedHTMLProps, ImgHTMLAttributes } from "react"

const elements = {
  [genshin.stats.stat.PYRO_DMG]: Pyro,
  [genshin.stats.stat.HYDRO_DMG]: Hydro,
  [genshin.stats.stat.CRYO_DMG]: Cryo,
  [genshin.stats.stat.ELECTRO_DMG]: Electro,
  [genshin.stats.stat.GEO_DMG]: Geo,
  [genshin.stats.stat.ANEMO_DMG]: Anemo,
  [genshin.stats.stat.DENDRO_DMG]: Dendro,
}

type IconProps<propName extends string> = { [k in propName]: number } &
  DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>

export function ElementIcon({ element, ...props }: IconProps<"element">) {
  const url = elements[element]
  if (!url) { return null }
  return <img width={24} height={24} {...props} src={url} />
}

export function AuraIcon({ aura, ...props }: IconProps<"aura">) {
  const element = genshin.stats.AuraToDmg(aura)
  return <ElementIcon element={element} {...props} />
}