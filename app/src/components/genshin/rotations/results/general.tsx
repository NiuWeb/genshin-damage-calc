import { PieChart } from "@src/components/charts/pie/pie"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { toPlaces } from "@src/utils/number"

export function RotationGeneralSummary({ data }: { data: genshin.rotation.Summary }) {
  return <div className="general-summary bg-black/25">
    <div className="p-1 text-xl font-bold bg-gray-800 flex justify-between gap-2">
      <div className="flex gap-2">
        <div>{GetString("LABEL.DAMAGE_ROTATION")}</div>
        <div className=" bg-yellow-500 text-black">
          {toPlaces(data.damage, 0)}
        </div>
      </div>
      <div className="flex gap-2">
        <div>{GetString("LABEL.DPS")} ({data.duration} s)</div>
        <div className=" bg-yellow-500 text-black">
          {toPlaces(data.dps, 0)}
        </div>
      </div>
    </div>
    <PieChart
      data={data.characters}
      label={(label) => GetString("ITEM." + label)}
      value={(_, value) => value.damage}
      tooltip={(_, value) => toPlaces(value.damage, 2) + " (" + toPlaces(value.relative * 100, 2) + "%)"}
      dataLabel={(label, { relative }) => (
        GetString("ITEM." + label) + " (" + toPlaces(relative * 100, 2) + "%)"
      )}
    />
  </div>
}