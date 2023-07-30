import { Upgrade, UpgradeData } from "../upgrades/upgrades"
import { CostList } from "./type"

/**
 * Finds a cost object in a cost list, from a given upgrade id
 */
export function FindCost(pool: CostList, upgrade: UpgradeData) {
    const key = getKey(upgrade)
    const cost = pool[key]
    if (!cost) {
        throw new Error(`Cost not found for ${key}`)
    }
    return cost
}

function getKey(upgrade: UpgradeData) {
    switch (upgrade.type) {
        case Upgrade.NORMAL_ATTACK_LEVEL:
        case Upgrade.ELEMENTAL_SKILL_LEVEL:
        case Upgrade.ELEMENTAL_BURST_LEVEL:
            return "talent_" + upgrade.value
        default:
            return Upgrade.Name(upgrade.type).toLowerCase() + "_" + upgrade.value
    }
}