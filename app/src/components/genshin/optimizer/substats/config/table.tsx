import { Checkbox } from "@src/components/checkbox/checkbox"
import { NumberField } from "@src/components/number-field/number-field"
import { genshin } from "@src/genshin/core"
import { printStat } from "@src/genshin/utils/stat"
import { GetString } from "@src/strings/strings"
import { useContext } from "react"
import { SubstatsConfigContext } from "./context"

const subs = genshin.stats.Substats

export function SubstatsConfigTable() {
  return <table className="substats-table">
    <thead>
      <tr>
        <th></th>
        <th>{GetString("LABEL.STAT")}</th>
        <th>{GetString("LABEL.VALUE")}</th>
        <th>{GetString("LABEL.MIN_SHORT")}</th>
        <th>{GetString("LABEL.MAX_SHORT")}</th>
      </tr>
    </thead>
    <tbody>
      {subs.map((sub) => (
        <SubstatsConfigRow key={sub} stat={sub} />
      ))}
    </tbody>
  </table>
}

function SubstatsConfigRow({ stat }: { stat: number }) {
  const { config, onChange } = useContext(SubstatsConfigContext)

  const row = config.substats.find(s => s.stat === stat)

  function toggle(checked: boolean) {
    if (checked) { // enable

      while (config.substats.length >= 5) {
        config.substats.pop()
      }
      config.substats.push({
        stat,
        min: 0,
        max: 12
      })
      onChange?.(config)

    } else { // disable
      if (row) {
        const index = config.substats.indexOf(row)
        config.substats.splice(index, 1)
        onChange?.(config)
      }
    }
  }

  function change(s: "min" | "max", v: number) {
    if (!row) { return }
    v = Math.max(0, Math.min(30, v))
    row[s] = v
    onChange?.(config)
  }

  return <tr>
    <td>
      <Checkbox checked={!!row} onChange={toggle} />
    </td>
    <td>
      <div className="px-1" onClick={() => toggle(!row)}>
        {GetString("STAT." + genshin.stats.stat.Name(stat))}
      </div>
    </td>
    <td>
      {printStat(stat, genshin.scaling.GetSubstatValue(5, stat, config.tier))}
    </td>
    <td className="text-right">
      <NumberField
        className="bg-slate-600 w-[32px]"
        readonly={!row}
        value={row?.min || 0}
        onChange={x => change("min", x)} />
    </td>
    <td className="text-right">
      <NumberField
        className="bg-slate-600 w-[32px]"
        readonly={!row}
        value={row?.max || 0}
        onChange={x => change("max", x)} />
    </td>
  </tr>
}