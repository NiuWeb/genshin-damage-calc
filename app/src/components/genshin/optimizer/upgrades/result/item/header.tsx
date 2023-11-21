import { Tooltip } from "@src/components/tooltip/tooltip"
import { genshin } from "@src/genshin/core"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { StarFill } from "react-bootstrap-icons"
import { TargetLabel } from "./target"

export function ItemHeader({ item }: { item: genshin.optimizer.upgrades.Result }) {
  const { upgrade } = item

  const title = genshin.optimizer.upgrades.Upgrade.Name(upgrade.type)

  const starId = Math.random().toString()

  return <div className={classes(
    "p-1",
    item.selected ? " bg-yellow-600/50" : "bg-slate-700"
  )}>
    <div className="flex justify-between items-center">
      <TargetLabel upgrade={upgrade} />
      {!item.selected || (
        <>
          <span data-tooltip={starId} className="text-yellow-500" >
            <StarFill />
          </span>
          <Tooltip id={starId}>
            {GetString("LABEL.OPTIMAL")}
          </Tooltip>
        </>
      )}
    </div>

    <div className="whitespace-nowrap flex justify-between items-center">
      <div>
        {GetString("STAT." + title)}
      </div>
      <div className={classes(
        "ml-2 px-1 bg-slate-300 text-black",
        "text-sm rounded-sm"
      )}>
        {upgrade.visible}
      </div>
    </div>
  </div>
}