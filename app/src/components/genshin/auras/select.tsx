import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { AuraIcon } from "./icon"

const allAuras = genshin.stats.aura.Values().filter(s => s !== 0)

export function AuraSelect({ auras, onChange, max, valid }: {
  auras: readonly number[]
  valid?: readonly number[]
  onChange?(auras: readonly number[]): void
  max?: number
}) {

  const list = allAuras
    .filter(s => (!valid || valid.length === 0) || (valid && valid.includes(s)))

  const id = Math.random().toString(36)
  const title = auras.length > 0 && auras[0] !== genshin.stats.aura.NONE ? (
    <div className="flex gap-1">
      {auras.map((aura) => (
        <div key={aura}>
          <AuraIcon aura={aura} />
        </div>
      ))}
    </div>
  ) : GetString("AURA.NONE")

  return <Dropdown
    onChange={onChange}
    multiple
    max={max || 2}
    title={title}
    values={[...auras]}>
    {list.map(aura => (
      <DropdownItem key={aura} value={aura} tooltip={id + "-" + aura}>
        <div className="flex gap-1">
          <div>
            <AuraIcon aura={aura} />
          </div>
          <div>
            {GetString("AURA." + genshin.stats.aura.Name(aura))}
          </div>
        </div>
        <Tooltip id={id + "-" + aura}>
          {genshin.stats.aura.Name(aura)} ({aura})
        </Tooltip>
      </DropdownItem>
    ))}
  </Dropdown>
}