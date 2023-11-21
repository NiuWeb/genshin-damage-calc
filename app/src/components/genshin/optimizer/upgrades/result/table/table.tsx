import { genshin } from "@src/genshin/core"
import { ResultItem } from "../item/item"
import { UpgradesRowProvider } from "./context"

export function UpgradesTable({ results }: { results: genshin.optimizer.upgrades.Result[][] }) {
  return <div className="flex flex-col gap-1">
    {results.map((row, i) => (
      <div key={i} className="flex flex-row gap-1 overflow-auto">
        <UpgradesRowProvider row={row}>
          {row.map((item, j) => (
            <ResultItem key={j} item={item} />
          ))}
        </UpgradesRowProvider>
      </div>
    ))}
  </div>
}