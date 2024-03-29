import { genshin } from "@src/genshin/core"
import { TargetLabel } from "../item/target"
import { toPlaces } from "@src/utils/number"
import { classes } from "@src/utils/classes"

export function UpgradeList({ results }: { results: genshin.optimizer.upgrades.Result[][] }) {
    const optimal = results
        .map(row => row.find(item => item.selected))
        .filter(item => item) as genshin.optimizer.upgrades.Result[]

    const totalIncrease = (() => {

        const final = optimal[optimal.length - 1]?.damage ?? 0
        const initial = optimal[0] ? optimal[0].damage / (1 + optimal[0].increase) : 0

        return (final - initial) / initial

    })()

    return <div className="flex justify-center">
        <div className="max-w-[1280px]">
            {optimal.map((item, i) => (
                <UpgradeItem
                    key={i}
                    item={item} />
            ))}
            <div className="inline-block text-sm px-1 text-black rounded-sm bg-green-500">
                Total increase: +{toPlaces(totalIncrease * 100, 2)}%
            </div>
        </div>
    </div>
}

function UpgradeItem({ item, last }: { item: genshin.optimizer.upgrades.Result, last?: boolean }) {
    const { upgrade } = item

    let strval = toPlaces(item.increase * 100, 1) + "%"
    if (item.increase > 0) strval = "+" + strval

    const isZero = Math.abs(item.increase) < 1e-12

    if (isZero) {
        strval = "0%"
    }

    return <div className="inline-flex gap-1 items-center mr-1">
        <TargetLabel upgrade={upgrade} />
        <span>{valueLabel(upgrade)}</span>
        <span className={classes(
            "text-xs p-0.5 rounded-sm text-black",
            isZero ? "bg-gray-300" : (
                item.increase > 1e-12 ? "bg-[#74ff39]" : "bg-[#eb574c]"
            )
        )}>
            {strval}
        </span>
        {!last && (
            <span className="text-xl font-bold">&gt;</span>
        )}
    </div>
}

export function valueLabel(upgrade: genshin.optimizer.upgrades.UpgradeData): string {

    switch (upgrade.type) {
        case genshin.optimizer.upgrades.Upgrade.NORMAL_ATTACK_LEVEL:
            return `NA to ${upgrade.visible}`
        case genshin.optimizer.upgrades.Upgrade.ELEMENTAL_SKILL_LEVEL:
            return `E to ${upgrade.visible}`
        case genshin.optimizer.upgrades.Upgrade.ELEMENTAL_BURST_LEVEL:
            return `Q to ${upgrade.visible}`
        case genshin.optimizer.upgrades.Upgrade.CHARACTER_ASCENSION:
            return `to A${upgrade.visible}`
        case genshin.optimizer.upgrades.Upgrade.CHARACTER_LEVEL:
            return `to lv. ${upgrade.visible}`
        case genshin.optimizer.upgrades.Upgrade.WEAPON_ASCENSION:
            return `weapon to A${upgrade.visible}`
        case genshin.optimizer.upgrades.Upgrade.WEAPON_LEVEL:
            return `weapon to lv. ${upgrade.visible}`
    }

    return ""
}
