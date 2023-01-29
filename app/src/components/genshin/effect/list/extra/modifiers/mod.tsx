import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { NumberField } from "@src/components/number-field/number-field"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { createContext, useContext, useReducer } from "react"
import { XCircle } from "react-bootstrap-icons"

const allStats = genshin.stats.stat.Values().filter(s => s !== genshin.stats.stat.NONE)

const ModContext = createContext({} as {
  update(): void
  mod: genshin.subject.Modifier
})
export interface ModifierProps {
  mod: genshin.subject.Modifier
  onChange?(): void
  onRemove?(): void
}

export function ModifierCard({ mod, onChange, onRemove }: ModifierProps) {
  const [, _update] = useReducer(x => (x + 1) % 6, 0)

  function update() {
    onChange?.()
    _update()
  }

  const id = Math.random().toString(36)
  return <ModContext.Provider value={{ update, mod }}>
    <div className="modifier flex border border-neutral-900">
      <ModifierStat />
      <ModifierValue />
      <button
        onClick={() => onRemove?.()}
        data-tooltip={id}
        className={classes(
          "p-1 bg-red-500 hover:bg-red-600 active:bg-red-700"
        )}>
        <XCircle />
      </button>
    </div>
    <Tooltip id={id}>
      {GetString("ACTION.REMOVE")}
    </Tooltip>
  </ModContext.Provider>
}

export function ModifierStat() {
  const { mod, update } = useContext(ModContext)
  const current = mod.GetProp()

  function change([stat]: number[]) {
    mod.SetProp(stat)
    update()
  }

  return <Dropdown
    onChange={change}
    className="w-full bg-slate-600"
    values={[current]}
    title={GetString("STAT." + genshin.stats.stat.Name(current))}>
    {allStats.map(stat => (
      <DropdownItem key={stat} value={stat}>
        {GetString("STAT." + genshin.stats.stat.Name(stat))}
      </DropdownItem>
    ))}
  </Dropdown>
}

export function ModifierValue() {
  const { mod, update } = useContext(ModContext)
  const current = mod.GetValue()
  const percent = !genshin.stats.FlatStats.includes(mod.GetProp())

  function change(val: number) {
    mod.SetValue(val)
    update()
  }

  return <div className="w-[128px] border-l border-r border-neutral-900">
    <NumberField
      className="w-full bg-neutral-200 text-black text-right px-1"
      value={current}
      percent={percent}
      onChange={change} />
  </div>
}