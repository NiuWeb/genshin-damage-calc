import { Tooltip } from "@src/components/tooltip/tooltip"
import { genshin } from "@src/genshin/core"
import { ElementBgColor } from "@src/genshin/utils/colors"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useMemo } from "react"
import { StarFill } from "react-bootstrap-icons"

export function ItemHeader({ item }: { item: genshin.optimizer.upgrades.Result }) {
  const { upgrade } = item

  const title = genshin.optimizer.upgrades.Upgrade.Name(upgrade.type)
  const elementBg = useMemo(() => {
    const factory = genshin.characters.FindByName(upgrade.target)
    if (!factory) return "bg-slate-700"

    return ElementBgColor(factory.Element)
  }, [upgrade.target])

  const starId = Math.random().toString()

  return <div className={classes(
    "p-1",
    item.selected ? " bg-yellow-600/50" : "bg-slate-700"
  )}>
    <div className="flex justify-between items-center">
      <div className={classes(
        "text-sm px-1 rounded-sm text-black",
        elementBg
      )}>
        {GetString("ITEM." + upgrade.target)}
      </div>
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