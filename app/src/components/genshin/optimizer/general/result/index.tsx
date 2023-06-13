import { Calc } from "@src/genshin/calc"
import { StarsBgColor } from "@src/genshin/utils/colors"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useMemo } from "react"
import { ResultsTable } from "../../table"

const optimizer = new genshin.optimizer.weapon.WeaponOptimizer()

export function WeaponResult({ results }: {
  results: genshin.optimizer.weapon.Result[]
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
    action={equip}
    actionLabel={GetString("LABEL.EQUIP")}
    mapHeader={header => GetString("LABEL." + header)}
    mapCell={mapCell} />
}

function mapCell(cell: string, header: string) {
  if (header === genshin.strings.labels.WEAPON) {
    return mapCellWeapon(cell)
  } else {
    return <div className="text-center px-2">
      {mapCellString(cell, header)}
    </div>
  }
}

function mapCellString(cell: string, header: string) {
  if (header === genshin.strings.labels.CONDITION) {
    if (cell.trim() === "") {
      return ""
    }
    return GetString("CONDITION." + cell)
  }
  return cell
}
function mapCellWeapon(cell: string) {
  const match = cell.match(/(.*?)\(R(\d+)\)/)
  const name = (match?.[1] || cell).trim()
  const weapon = genshin.weapons.FindByName(name)
  if (!weapon) {
    return cell
  }
  const rank = match?.[2] || 1
  return <div className={classes("px-2 py-1 text-black", StarsBgColor(weapon.Stars))}>
    {GetString("ITEM." + weapon.Name) + ` (R${rank})`}
  </div>
}