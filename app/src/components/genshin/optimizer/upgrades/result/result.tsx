import { exportImage } from "@src/components/datatable/export/image"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useRef } from "react"
import { UpgradesChart } from "./chart/chart"
import { UpgradesTable } from "./table/table"
import { UpgradeList, valueLabel } from "./table/list"
import { unparse } from "papaparse"
import { downloadFile } from "@src/genshin/utils/file"

export function UpgradesResults({ results }: { results: genshin.optimizer.upgrades.Result[][] }) {

  const ref = useRef<HTMLDivElement>(null)
  async function exportImg() {
    if (!ref.current) {
      return
    }
    await exportImage(ref.current)
  }

  async function exportCsv() {
    const json = results
      .map(r => r[0])
      .filter(r => r)
      .map(r => ({
        character: r.upgrade.target,
        value: valueLabel(r.upgrade),
        damage: r.damage,
        increase: r.increase,
        cost: r.cost,
      }))

      const csv = unparse(json)
      downloadFile("upgrades.csv", csv)
  }

  return <div className="upgrades-result flex flex-col gap-1">
    <div className="flex justify-center">
      <UpgradesChart results={results} />
    </div>
    <UpgradeList results={results} />
    <div className="flex justify-center gap-1">
      <button onClick={exportImg} className="p-1 bg-blue-600 hover:bg-blue-700">
        {GetString("ACTION.EXPORT.IMAGE")}
      </button>
      <button onClick={exportCsv} className="p-1 bg-blue-600 hover:bg-blue-700">
        {GetString("ACTION.EXPORT.CSV")}
      </button>
    </div>
    <div className="table-container bg-neutral-800" ref={ref}>
      <UpgradesTable results={results} />
    </div>
  </div>
}