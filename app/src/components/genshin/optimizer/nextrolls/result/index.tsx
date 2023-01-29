import { BarChart } from "@src/components/charts/bar/bar"
import { genshin } from "@src/genshin/core"
import { printStat } from "@src/genshin/utils/stat"
import { GetString } from "@src/strings/strings"
import { toPlaces } from "@src/utils/number"
import { useMemo } from "react"

export function NextRollResult({ config, results }: {
  config: genshin.optimizer.nextroll.BaseConfig
  results?: genshin.optimizer.nextroll.Result[]
}) {
  const data = useMemo(() => {
    const data: { [x: number]: genshin.optimizer.nextroll.Result } = {}
    if (!results) { return data }

    results.forEach((r, i) => {
      if (r.benefit > 1e-6) {
        data[i] = r
      }
    })
    return data
  }, [config, results])

  function mapStat(stat: number): string {
    const value = genshin.scaling.GetSubstatValue(5, stat, config.tier)
    return GetString("STAT." + genshin.stats.stat.Name(stat)) + ` (+${printStat(stat, value)})`
  }

  if (!results) {
    return <>{GetString("LABEL.RESULT_NONE")}</>
  }

  return <div className="nextroll-result bg-white w-[640px] text-black">
    <BarChart
      horizontal
      title={GetString("OPTIMIZER.NEXTROLL_BENEFIT")}
      foreColor="black"
      data={data}
      label={(_, v) => mapStat(v.stat)}
      value={(_, v) => v.benefit}
      dataLabel={(_, v) => toPlaces(v.benefit * 100, 4) + "%"}
      xaxis={(v: number) => toPlaces(v * 100, 2) + "%"} 
      tooltip={(_, value) => {
        return toPlaces(value.benefit * 100, 4) + "%"
      }} />
  </div>
}