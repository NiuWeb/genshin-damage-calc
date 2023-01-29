import { Calc } from "@src/genshin/calc"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useMemo } from "react"
import { ResultsTable } from "../../table"

export function SubstatsResults({ config, results }: {
  results: genshin.optimizer.substats.Result[],
  config: genshin.optimizer.substats.BaseConfig
}) {
  const format = useMemo(() => {
    if (!results || results.length === 0) { return undefined }
    const optimizer = new genshin.optimizer.substats.SubstatsOptimizer()
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
    const optimizer = new genshin.optimizer.substats.SubstatsOptimizer()
    optimizer.SetConfig(config)
    const cmd = optimizer.EquipCmd(results[index])
    await Calc.RunConfirm(cmd)
  }

  return <ResultsTable
    {...format}
    mapHeader={cell => GetString("STAT." + cell)}
    action={equip}
    actionLabel={GetString("LABEL.EQUIP")}
    mapCell={(cell) => <div className="text-center px-2">{cell}</div>}
  />
}