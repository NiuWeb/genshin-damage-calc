import { genshin } from "@src/genshin/core"
import { ItemBody } from "./body"
import { ItemHeader } from "./header"

export function ResultItem({ item }: { item: genshin.optimizer.upgrades.Result }) {
  return <div className="result-item-card flex flex-col">
    <ItemHeader item={item} />
    <ItemBody item={item} />
  </div>
}
