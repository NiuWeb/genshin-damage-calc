import { genshin } from "@src/genshin/core"
import { UpgradesChart } from "./chart/chart"
import { UpgradesTable } from "./table/table"

export function UpgradesResults({ results }: { results: genshin.optimizer.upgrades.Result[][] }) {
  return <div className="upgrades-result">
    <UpgradesChart results={results} />
    <UpgradesTable results={results} />
  </div>
}