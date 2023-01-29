import { Dropdown } from "@src/components/dropdown/dropdown"
import { DropdownItem } from "@src/components/dropdown/item"
import { NumberField } from "@src/components/number-field/number-field"
import { genshin } from "@src/genshin/core"
import { printStat } from "@src/genshin/utils/stat"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useContext } from "react"
import { ArtifactContext } from "./context"

export function ArtifactStat({ index, main }: { main?: boolean, index: number }) {
  const { artifact, update, readonly } = useContext(ArtifactContext)
  const [stat, value] = (() => {
    if (main) {
      return [artifact.GetMainstat(), artifact.GetMainstatValue()]
    } else {
      return [artifact.GetSubstat(index), artifact.GetSubstatValue(index)]
    }
  })()

  const options = (() => {
    if (main) {
      return genshin.stats.PieceToMainstats(artifact.GetPiece())
    }
    return genshin.stats.Substats.filter(s => s !== artifact.GetMainstat())
  })()

  function changeStat(stat: number) {
    if (readonly) { return }
    stat = stat || 0
    if (main) {
      artifact.SetMainstat(stat)
    } else {
      artifact.SetSubstat(index, stat)
    }
    update()
  }
  function changeValue(stat: number) {
    if (readonly) { return }
    if (main) { return }
    artifact.SetSubstatValue(index, stat || 0)
    update()
  }

  const percent = !genshin.stats.FlatStats.includes(stat)
  return <div className={classes("artifact-stat flex", main ? "bg-black/10" : " text-sm")}>
    <div className="grow">
      <Dropdown
        disabled={readonly}
        className="w-full text-left"
        notEmpty
        title={GetString("STAT." + genshin.stats.stat.Name(stat))}
        onChange={([s]) => changeStat(s)}
        values={[stat]}>
        {options.map(s => (
          <DropdownItem value={s} key={s}>
            {GetString("STAT." + genshin.stats.stat.Name(s))}
          </DropdownItem>
        ))}
      </Dropdown>
    </div>
    {!main ? (
      <NumberField
        divClassName="w-[64px]"
        className="bg-slate-600 w-full"
        onChange={changeValue}
        value={value}
        readonly={main || readonly}
        places={percent ? 1 : 0}
        percent={percent} />
    ) : (
      <div className="w-[64px]">
        {printStat(stat, value)}
      </div>
    )}

  </div>
}