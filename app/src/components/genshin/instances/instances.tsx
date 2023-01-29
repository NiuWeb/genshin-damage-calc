import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { Fragment, useState } from "react"
import { InstanceRows } from "./rows"

const type_string: { [mode: number]: string } = {
  [genshin.formula.CritType.NO_CRIT]: "LABEL.DAMAGE_NOCRIT",
  [genshin.formula.CritType.CRIT]: "LABEL.DAMAGE_CRIT",
  [genshin.formula.CritType.CRIT_AVG]: "LABEL.DAMAGE_AVG",
}
const type_key = Object.keys(type_string).map(mode => parseInt(mode))

export function InstancesCard({ charbox }: { charbox: genshin.charbox.Charbox }) {
  const [type, setType] = useState(genshin.formula.CritType.CRIT_AVG)
  function change([next]: number[]) {
    if (Number.isFinite(next)) {
      setType(next)
    }
  }

  const groups: { [group: string]: readonly genshin.instance.Instance[] } = {
    NORMALS: charbox.GetNormals(),
    SKILLS: charbox.GetSkills(),
    BURSTS: charbox.GetBursts(),
    TR: charbox.GetTr(),
    EXTRA: charbox.GetExtra()
  }

  const entries = Object.entries(groups)

  return <div className="instances-card bg-slate-700">
    <div className="px-2 py-1 text-xl font-bold bg-gray-800">
      {GetString("LABEL.DAMAGE")}
    </div>
    <div className="p-1">
      <table className="w-full">
        <thead>
          <tr>
            <th className="text-left">{GetString("LABEL.INSTANCE")}</th>
            <th className="text-right">
              <Dropdown
                title={GetString(type_string[type])}
                values={[type]}
                onChange={change}>
                {type_key.map(k => (
                  <DropdownItem key={k} value={k}>
                    <span>
                      {GetString(type_string[k])}
                    </span>
                  </DropdownItem>
                ))}
              </Dropdown>
            </th>
          </tr>
        </thead>

        {entries.map(([group, instances], i) => (
          <Fragment key={i}>
            <thead>
              <tr>
                <td colSpan={2} className="text-center bg-gray-800/50">
                  {GetString("LABEL.INSTANCE_" + group)}
                </td>
              </tr>
            </thead>
            {instances.length > 0 ? (
              <InstanceRows instances={instances} type={type} />
            ) : (
              <tbody>
                <tr>
                  <td colSpan={2} className="text-center text-sm">
                    {GetString("LABEL.NONE")}
                  </td>
                </tr>
              </tbody>
            )}
          </Fragment>
        ))}
      </table>
    </div>
  </div>
}