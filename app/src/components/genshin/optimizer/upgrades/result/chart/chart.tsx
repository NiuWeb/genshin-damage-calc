import { LineChart } from "@src/components/charts/line/line"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { toPlaces } from "@src/utils/number"
import { useMemo } from "react"

export function UpgradesChart({ results }: { results: genshin.optimizer.upgrades.Result[][] }) {
  const data = useMemo(() => (
    genshin.optimizer.upgrades.UpgradesOptimizer.Curve(results)
  ), [results])

  return <div className="bg-white text-black w-[720px]">
    <LineChart
      title={GetString("LABEL.DAMAGE_VS_RESIN_COST")}
      label={GetString("LABEL.DAMAGE")}
      axis={{
        xtitle: GetString("LABEL.TOTAL_RESIN_COST"),
        ytitle: GetString("LABEL.DAMAGE"),
      }}
      tooltip={(_, val) => toPlaces(val, 0)}
      xtooltip={(_, val) => `${GetString("LABEL.COST")}: ${toPlaces(val, 0)}`}
      data={data}
    />
  </div>
}