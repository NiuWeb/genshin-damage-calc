import { genshin } from "@src/genshin/core"
import { printStat } from "@src/genshin/utils/stat"
import { GetString } from "@src/strings/strings"

export function WeaponStats({ weapon }: { weapon: genshin.weapon.Weapon }) {
  return <div className="weapon-stats p-1">
    <table className="w-full">
      <tbody>
        <tr>
          <td>{GetString("STAT.ATK_BASE")}</td>
          <td className="text-right">{printStat(genshin.stats.stat.ATK_BASE, weapon.GetAtkBase())}</td>
        </tr>
        <tr>
          <td>{GetString("STAT." + genshin.stats.stat.Name(weapon.GetSubstat()))}</td>
          <td className="text-right">{printStat(weapon.GetSubstat(), weapon.GetSubstatValue(), 1)}</td>
        </tr>
      </tbody>
   </table>
 </div> 
}