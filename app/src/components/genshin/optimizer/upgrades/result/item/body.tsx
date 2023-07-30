import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { createDefaultColormap } from "@src/utils/colormap"
import { toPlaces } from "@src/utils/number"

const labels = ["damage", "increase", "efficiency"] as const
function format(label: typeof labels[number], value: number) {
  switch (label) {
    case "increase":
    case "efficiency":
      return toPlaces(value * 100, 2) + "%"
    case "damage":
      return toPlaces(value, 2)
  }
}


export function ItemBody({ item }: { item: genshin.optimizer.upgrades.Result }) {

  createDefaultColormap

  return <div className="p-1 flex flex-col gap-1 bg-neutral-600">
    {labels.map((label, i) => (
      <div key={i} className="flex items-center">
        <div className="flex-grow pr-1">
          {GetString("LABEL." + label.toUpperCase())}
        </div>
        <div className="bg-slate-400 text-black text-sm px-1 rounded-sm">
          {format(label, item[label])}
        </div>
      </div>
    ))}
  </div>
}