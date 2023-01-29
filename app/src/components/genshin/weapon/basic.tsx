import { NumberField } from "@src/components/number-field/number-field"
import { Tooltip } from "@src/components/tooltip/tooltip"
import { useCalc } from "@src/genshin/context"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { Plus, Dash } from "react-bootstrap-icons"

export function WeaponBasic({ weapon }: { weapon: genshin.weapon.Weapon }) {
  const [, exec] = useCalc()

  function changeRank(rank: number) {
    exec(() => weapon.SetRank(rank))
  }
  function changeLevel(level: number) {
    exec(() => weapon.SetLevel(level))
  }
  function toggleAscended() {
    exec(() => weapon.SetAscension(weapon.IsAscended() ? 0 : 6))
  }


  const id = Math.random().toString(36)
  const rankId = "weapon-rank" + id
  const ascendedId = "weapon-ascended" + id

  return <div className="weapon-basic flex gap-0.5">
    <div className="flex items-stretch">
      <NumberField
        className=" w-[32px] text-right bg-slate-600"
        places={0}
        onChange={changeLevel}
        value={weapon.GetLevel()} />
      <button
        onClick={toggleAscended}
        data-tooltip={ascendedId}
        className=" bg-gray-600 hover:bg-gray-700 active:bg-gray-800">
        {weapon.IsAscended() ? (
          <Plus />
        ) : (
          <Dash />
        )}
      </button>
      <Tooltip id={ascendedId}>
        {GetString(weapon.IsAscended() ? "LABEL.ASCENDED" : "LABEL.ASCENDED_NOT")}
      </Tooltip>
    </div>
    <div className="flex items-stretch">
      <div
        data-tooltip={rankId}

        className="bg-slate-600 px-0.5">
        R
      </div>
      <NumberField
        className="bg-slate-600 w-[16px] text-right"
        value={weapon.GetRank()}
        onChange={changeRank} />
      <Tooltip id={rankId}>
        {GetString("LABEL.WEAPON_RANK")}
      </Tooltip>
    </div>
  </div>
}