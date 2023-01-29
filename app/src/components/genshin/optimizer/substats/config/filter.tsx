import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { NumberField } from "@src/components/number-field/number-field"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { XCircle } from "react-bootstrap-icons"

const allStats = genshin.stats.stat.Values().filter(s => s !== genshin.stats.stat.NONE)
const allOps = ["<=", ">="] as const

export function FilterCard({ filters, onChange }: {
  filters?: genshin.optimizer.filter.Filter[]
  onChange?(filters: genshin.optimizer.filter.Filter[]): void
}) {
  function add() {
    const f = filters || []
    f.push({ stat: genshin.stats.stat.ATK_PERCENT, operator: ">=", value: 0 })
    onChange?.(f)
  }
  return <div className="filters flex flex-col gap-0.5">
    <button
      onClick={add}
      className="p-1 bg-sky-600 hover:bg-sky-600/70 active:bg-sky-600/40">
      {GetString("ACTION.FILTER_ADD")}
    </button>
    {filters?.map((f, i) => (
      <FilterRow
        key={i}
        filter={f}
        onChange={() => onChange?.(filters || [])}
        onRemove={() => onChange?.((filters || []).filter(s => s !== f))} />
    ))}
  </div>
}

function FilterRow({ filter, onChange, onRemove }: {
  filter: genshin.optimizer.filter.Filter
  onChange?(): void
  onRemove?(): void
}) {

  function changeStat([stat]: number[]) {
    if (!stat) { return }
    filter.stat = stat
    onChange?.()
  }

  function changeOp([index]: number[]) {
    const op = allOps[index] || "<="
    filter.operator = op
    onChange?.()
  }

  function changeValue(value: number) {
    filter.value = value
    onChange?.()
  }

  const id = Math.random().toString(35)

  return <div className="flex gap-1">
    <div className="grow">
      <Dropdown
        notEmpty
        className="bg-slate-600 w-full"
        onChange={changeStat}
        title={GetString("STAT." + genshin.stats.stat.Name(filter.stat))}
        values={[filter.stat]} >
        {allStats.map(stat => (
          <DropdownItem key={stat} value={stat}>
            {GetString("STAT." + genshin.stats.stat.Name(stat))}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
    <div>
      <Dropdown
        notEmpty
        className="bg-gray-600"
        onChange={changeOp}
        values={[allOps.indexOf(filter.operator)]}
        title={[filter.operator]}>
        {allOps.map((o, i) => (
          <DropdownItem key={i} value={i}>{o}</DropdownItem>
        ))}
      </Dropdown>
    </div>
    <div className="w-[64px]">
      <NumberField
        className="bg-slate-600 w-full"
        value={filter.value}
        onChange={changeValue}
        percent={!genshin.stats.FlatStats.includes(filter.stat)} />
    </div>
    <div>
      <button
        onClick={onRemove}
        data-tooltip={id}
        className="p-1 bg-red-500 hover:bg-red-600 active:bg-red-700">
        <XCircle />
      </button>
      <Tooltip id={id}>{GetString("ACTION.REMOVE")}</Tooltip>
    </div>
  </div>
}