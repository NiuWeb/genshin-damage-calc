import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { toPlaces } from "@src/utils/number"

const tiers = Array.from(Array(4)).fill(0).map((_, i) => i)
const colors = [
  "bg-red-500", "bg-orange-500", "bg-yellow-500", "bg-green-500",
  "bg-slate-500 border-l border-l-black",
  "bg-blue-500 border-l border-l-black"
]
export function ArtboxSummary({ artbox }: { artbox: genshin.artbox.Artbox }) {
  const { result, total } = artbox.RollSummary()

  return <div className="artbox-summary">
    <table className="w-full">
      <thead>
        <tr>
          <th className="px-1">{GetString("LABEL.STAT")}</th>
          {tiers.map((tier, i) => (
            <th key={i} className="px-1">{GetString("LABEL.ARTIFACT_TIER_X", {
              vars: { tier }
            })}</th>
          ))}
          <th className="px-1">{GetString("LABEL.TOTAL")}</th>
          <th className="px-1">{GetString("LABEL.AVERAGE")}</th>
        </tr>
      </thead>
      <tbody>
        {result.map(([stat, rolls], i) => (
          <tr key={i}>
            <td className="px-1">{GetString("STAT." + genshin.stats.stat.Name(stat))}</td>
            {rolls.map((value, i) => (
              <td
                key={i}
                className={classes(colors[i], "text-black text-center")}>
                {toPlaces(value, 0)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="border-t border-t-black">
          <th className="px-1">
            {GetString("LABEL.TOTAL")}
          </th>
          {total.map((value, i) => (
            <td
              key={i}
              className={classes(colors[i], "text-black text-center")}>
              {toPlaces(value, 0)}
            </td>
          ))}
        </tr>
      </tfoot>
    </table>
  </div>
}