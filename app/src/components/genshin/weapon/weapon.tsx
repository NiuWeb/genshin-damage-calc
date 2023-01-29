import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItemEmpty } from "@src/components/dropdown/item-empty"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { StarsBgColor } from "@src/genshin/utils/colors"
import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useMemo } from "react"
import { StarFill } from "react-bootstrap-icons"
import { EffectCard } from "../effect/effect"
import { WeaponBasic } from "./basic"
import { WeaponStats } from "./stats"

export function WeaponCard({ charbox }: {
  charbox: genshin.charbox.Charbox,
}) {
  const [, exec] = useCalc()
  const wpType = charbox.GetCharacter().Options.Weapon
  const weapons = useMemo(() => (
    genshin.weapons.GetByType(wpType)
  ), [wpType])

  const current = charbox.GetWeapon()
  const foundCurrent = current ? genshin.weapons.FindByName(current.Options.Name) : undefined
  const value = foundCurrent ? [weapons.indexOf(foundCurrent)] : []

  const title = <div className="text-sm max-w-[240px]">
    {current ? GetString("ITEM." + current.Options.Name) : GetString("LABEL.WEAPON_NONE")}
  </div>

  function change([next]: number[]) {
    if (next === null || next === undefined || value.includes(next)) {
      return
    }
    const wp = weapons[next]
    if (!wp) { return }

    const prevLevel = current?.GetLevel() || 1
    const prevRank = current?.GetRank() || 1
    exec(() => {
      charbox.SetWeapon(wp)
      charbox.GetWeapon()?.SetLevel(prevLevel)
      charbox.GetWeapon()?.SetRank(prevRank)
    })
  }
  const id = Math.random().toString(36)
  return <div className="weapon bg-slate-700">
    <div className="px-2 py-1 text-xl font-bold bg-gray-800">
      {GetString("LABEL.WEAPON")}
    </div>
    <div className="p-1 flex">
      <Dropdown
        title={title}
        className="w-full truncate text-left"
        onChange={change}
        values={value}>
        {weapons.map((wp, i) => (
          <DropdownItemEmpty key={i} value={i} tooltip={id + "-" + i}>
            <div className={classes(
              StarsBgColor(wp.Stars),
              " text-black"
            )}>
              <div className={classes(
                "flex gap-1 items-center p-1",
                "hover:bg-black/25 hover:cursor-pointer",
                value.includes(i) ? "bg-white/25" : ""
              )}>
                {wp.Stars}
                <StarFill />
                {GetString("ITEM." + wp.Name)}
              </div>
            </div>
            <Tooltip id={id + "-" + i} >
              {wp.Name}
            </Tooltip>
          </DropdownItemEmpty>
        ))}
      </Dropdown>
      {current && <WeaponBasic weapon={current} />}
    </div>
    {current && <WeaponStats weapon={current} />}
    {current && current.GetEffects().map((ef, i) => (
      <EffectCard key={i} effect={ef} onChange={() => exec()} />
    ))}
  </div>
}