import { FoodBody } from "@src/components/genshin/effect/list/extra/foods/food"
import { Calc } from "@src/genshin/calc"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { useMemo } from "react"
import { ResultsTable } from "../../table"

const optimizer = new genshin.optimizer.food.FoodOptimizer()

export function FoodResult({ results }: { results?: genshin.optimizer.food.Result[] }) {
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

  function equip(index: number) {
    if (!results) { return }
    const cmd = results[index].cmd
    Calc.RunConfirm(cmd)
  }

  return <ResultsTable
    {...format}
    action={equip}
    actionLabel={GetString("LABEL.EQUIP")}
    mapHeader={header => GetString(header)}
    mapCell={(cell) => <Item name={cell} />}
  />
}

function Item({ name }: { name: string }) {
  const food = genshin.foods.FindByName(name)
  if (!food) { return <>{name}</> }
  return <div className="bg-slate-700">
    <div className="p-1 bg-gray-800">
      {name}
    </div>
    <FoodBody food={food} />
  </div>
}