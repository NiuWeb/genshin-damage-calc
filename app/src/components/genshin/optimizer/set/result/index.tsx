import { Calc } from "@src/genshin/calc"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { ReactNode, useMemo } from "react"
import { ResultsTable } from "../../table"

const optimizer = new genshin.optimizer.set.SetOptimizer()

export function SetResult({ results }: {
  results: genshin.optimizer.set.Result[]
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
    const cmd = optimizer.EquipCmd(results[index])
    await Calc.RunConfirm(cmd)
  }

  return <ResultsTable
    {...format}
    mapHeader={mapHeader}
    action={equip}
    actionLabel={GetString("LABEL.EQUIP")}
    mapCell={(cell, header) => <div className="text-center px-2">{mapName(cell, header)}</div>}
  />
}

function mapHeader(name: string) {
  return GetString("LABEL." + name)
}

const EXP = /(\(\d+\))/
function mapName(input: string, header: string): ReactNode {
  if (header === genshin.strings.labels.STACKS) {
    return input
  }
  if (header === genshin.strings.labels.CONDITION) {
    if (input.trim() === "") {
      return ""
    }
    return GetString("CONDITION." + input)
  }

  const name = input.replace(EXP, "").trim()
  const piece = input.match(EXP)?.[1] || "(2)"
  return <>
    {GetString("ITEM." + name)} <strong>{piece}</strong>
  </>
}