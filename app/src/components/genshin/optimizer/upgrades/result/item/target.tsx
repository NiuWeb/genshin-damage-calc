import { genshin } from "@src/genshin/core"
import { ElementBgColor } from "@src/genshin/utils/colors"
import { GetString } from "@src/strings/strings"
import { classes } from "@src/utils/classes"
import { useMemo } from "react"

export function TargetLabel({ upgrade }: { upgrade: genshin.optimizer.upgrades.UpgradeData }) {
    const elementBg = useMemo(() => {
        const factory = genshin.characters.FindByName(upgrade.target)
        if (!factory) return "bg-slate-700"

        return ElementBgColor(factory.Element)
    }, [upgrade.target])

    return <div className={classes(
        "inline-block",
        "text-sm px-1 rounded-sm text-black",
        elementBg
    )}>
        {GetString("ITEM." + upgrade.target)}
    </div>
}