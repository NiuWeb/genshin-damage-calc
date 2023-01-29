import { NumberField } from "@src/components/number-field/number-field"
import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { toPlaces } from "@src/utils/number"
import { EnemyAuras } from "./auras"

const res = genshin.stats.Elements.map(el => genshin.stats.DmgToRes(el))

export function EnemyCard({ enemy }: { enemy: genshin.enemy.Enemy }) {
  const [, exec] = useCalc()
  function changeRes(stat: number, value: number) {
    enemy.SetBaseRes(stat, value)
    exec()
  }
  function changeLevel(level: number) {
    enemy.SetLevel(level)
    exec()
  }

  return <div className="instances-card bg-slate-700">
    <div className="px-2 py-1 text-xl font-bold bg-gray-800">
      {GetString("LABEL.ENEMY")}
    </div>
    <div className="p-1">
      <table className="w-full">
        <thead>
          <tr>
            <th>{GetString("LABEL.STAT")}</th>
            <th>{GetString("LABEL.BASE")}</th>
            <th>{GetString("LABEL.TOTAL")}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{GetString("LABEL.AURA")}</td>
            <td colSpan={2}>
              <div className="flex justify-end">
                <EnemyAuras enemy={enemy} />
              </div>
            </td>
          </tr>
          <tr>
            <td>{GetString("STAT.LEVEL")}</td>
            <td colSpan={2} className="text-right">
              <NumberField
                className="bg-slate-600 w-[42px]"
                onChange={v => changeLevel(v)}
                value={enemy.GetLevel()} />
            </td>
          </tr>
          {res.map((res, i) => (
            <tr key={i}>
              <td>{GetString("STAT." + genshin.stats.stat.Name(res))}</td>
              <td className="text-right">
                <NumberField
                  className="bg-slate-600 w-[42px]"
                  onChange={v => changeRes(res, v)}
                  value={enemy.GetBaseRes(res)}
                  percent />
              </td>
              <td className="text-right">
                {toPlaces(enemy.Subject.Get(res) * 100, 2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
}