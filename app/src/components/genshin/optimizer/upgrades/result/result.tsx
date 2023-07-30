import { genshin } from "@src/genshin/core"
import { ResultItem } from "./item/item"

export function UpgradesResults({ results }: { results: genshin.optimizer.upgrades.Result[][] }) {
  return <div className="flex flex-col gap-1">
    {results.map((row, i) => <div key={i} className="flex flex-row gap-1">
      {row.map((item, j) => <ResultItem key={j} item={item} />)}
    </div>)}
  </div>
}