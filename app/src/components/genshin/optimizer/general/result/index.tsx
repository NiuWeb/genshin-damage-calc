import { Calc } from "@src/genshin/calc"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useMemo } from "react"
import { ResultsTable } from "../../table"
import { mapCell, mapHeader } from "./map"

const optimizer = genshin.optimizer.general.GeneralOptimizer

export function GeneralResult({ results }: {
  results: genshin.optimizer.general.Result[]
}) {
  const format = useMemo(() => {
    if (!results || results.length === 0) { return undefined }
    const damages = results.map(r => r.damage)

    return {
      table: optimizer.Format(results),
      min: damages.reduce((a, b) => Math.min(a, b), Infinity),
      max: damages.reduce((a, b) => Math.max(a, b), -Infinity),
      maxRelative: results.map(r => r.relative).reduce((a, b) => Math.max(a, b), -Infinity)
    }
  }, [results])

  if (!results || !format) {
    return <>{GetString("LABEL.RESULT_NONE")}</>
  }
  async function equip(index: number) {
    if (!results) { return }
    const cmd = results[index].cmd
    await Calc.RunConfirm(cmd)
  }

  return <ResultsTable
    {...format}
    action={equip}
    actionLabel={GetString("LABEL.EQUIP")}
    mapHeader={mapHeader}
    mapCell={mapCell} />
}