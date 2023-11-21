import { exportImage } from "@src/components/datatable/export/image"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useRef } from "react"
import { UpgradesChart } from "./chart/chart"
import { UpgradesTable } from "./table/table"
import { UpgradeList } from "./table/list"

export function UpgradesResults({ results }: { results: genshin.optimizer.upgrades.Result[][] }) {

  const ref = useRef<HTMLDivElement>(null)
  async function exportImg() {
    if (!ref.current) {
      return
    }
    await exportImage(ref.current)
  }

  return <div className="upgrades-result flex flex-col gap-1">
    <div className="flex justify-center">
      <UpgradesChart results={results} />
    </div>
    <UpgradeList results={results} />
    <button onClick={exportImg} className="bg-gray-600 hover:bg-gray-700">
      {GetString("ACTION.EXPORT.IMAGE")}
    </button>
    <div className="table-container bg-neutral-800" ref={ref}>
      <UpgradesTable results={results} />
    </div>
  </div>
}