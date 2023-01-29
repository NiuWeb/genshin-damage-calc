import { Calc } from "@src/genshin/calc"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useMemo } from "react"
import { ResultsTable } from "../../table"

export function MainstatResult({ config, results }: {
  results: genshin.optimizer.mainstat.Result[],
  config: genshin.optimizer.mainstat.BaseConfig
}) {
  const format = useMemo(() => {
    if (!results || results.length === 0) { return undefined }
    const optimizer = new genshin.optimizer.mainstat.MainstatOptimizer()
    optimizer.SetConfig(config)

    const damages = results.map(r => r.damage)

    return {
      table: optimizer.Format(results),
      min: damages.reduce((a, b) => Math.min(a, b), Infinity),
      max: damages.reduce((a, b) => Math.max(a, b), -Infinity),
      maxRelative: results.map(r => r.relative).reduce((a, b) => Math.max(a, b), -Infinity)
    }
  }, [results, config])

  if (!results || !format) {
    return <>{GetString("LABEL.RESULT_NONE")}</>
  }
  async function equip(index: number) {
    if (!results) { return }
    const optimizer = new genshin.optimizer.mainstat.MainstatOptimizer()
    optimizer.SetConfig(config)
    const cmd = optimizer.EquipCmd(results[index])
    await Calc.RunConfirm(cmd)
  }

  return <ResultsTable
    {...format}
    actionLabel={GetString("LABEL.EQUIP")}
    action={equip}
    mapHeader={header => (
      genshin.stats.piece.Has(header) ? (
        GetString("ARTIFACT." + header)
      ) : (
        GetString("STAT." + header)
      )
    )}
    mapCell={(cell, header) => <div className="text-center px-2">
      {genshin.stats.piece.Has(header) ? (
        GetString("STAT." + cell)
      ) : (cell)}
    </div>} />
}