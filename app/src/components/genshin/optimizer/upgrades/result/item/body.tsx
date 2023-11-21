import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { createDefaultColormap } from "@src/utils/colormap"
import { toPlaces } from "@src/utils/number"
import { useUpgradesRowContext } from "../table/context"

const labels = ["damage", "increase", "efficiency", "cost"] as const
const criteria = ["damage", "cost", "efficiency"] as const

function format(label: typeof labels[number], value: number) {
  switch (label) {
    case "increase":
      return toPlaces(value * 100, 4) + "%"
    case "efficiency":
      return toPlaces(value * 100 * 100, 4) + " bp"
    case "damage":
    case "cost":
      return toPlaces(value, 0)
  }
}


export function ItemBody({ item }: { item: genshin.optimizer.upgrades.Result }) {

  createDefaultColormap

  return <div className="p-1 flex flex-col gap-1 bg-neutral-600">
    {labels.map((label, i) => (
      <ItemValue key={i} label={label} item={item} />
    ))}
  </div>
}

function ItemValue({ label, item }: {
  label: typeof labels[number]
  item: genshin.optimizer.upgrades.Result
}) {

  const crit = criteria.includes(label as never) ? label as genshin.optimizer.upgrades.Criteria : undefined
  const { colormap } = useUpgradesRowContext()

  const backgroundColor = crit && item.criteria === crit ?
    colormap[crit][genshin.optimizer.upgrades.Criteria[crit].criteria](item[crit]) :
    undefined

  return <div className="flex items-center">
    <div className="flex-grow pr-1">
      {GetString("LABEL." + label.toUpperCase())}
    </div>
    <div
      style={{ backgroundColor }}
      className="bg-slate-400 text-black text-sm px-1 rounded-sm">
      {format(label, item[label])}
    </div>
  </div>
}