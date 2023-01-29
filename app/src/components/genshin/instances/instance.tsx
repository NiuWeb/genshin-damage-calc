import { ElementBgColor } from "@src/genshin/utils/colors"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { InstanceFormula } from "../formulas/instance/formula"

export function InstanceCard({ instance, type }: {
  instance: genshin.instance.Instance
  type: genshin.formula.CritType
}) {
  return <div >
    <table className="instance-card w-full">
      <tbody>
        <tr>
          <td>{GetString("LABEL.NAME")}</td>
          <td className="text-right">
            <code className="bg-black/50 p-0.5">{instance.Options.Name}</code>
          </td>
        </tr>
        <tr>
          <td>{GetString("LABEL.ELEMENT")}</td>
          <td className="text-right">
            <div className={classes("text-black inline-block px-0.5", ElementBgColor(instance.GetElement()))}>
              {GetString("STAT." + genshin.stats.stat.Name(instance.GetElement()))}
            </div>
          </td>
        </tr>
        <tr>
          <td>{GetString("LABEL.TALENT")}</td>
          <td className="text-right">
            {GetString("STAT." + genshin.stats.stat.Name(instance.Options.Talent))}
          </td>
        </tr>
      </tbody>
    </table>
    <InstanceFormula instance={instance} type={type} />
  </div>
}