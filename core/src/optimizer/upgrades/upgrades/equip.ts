import { getMaxLevel } from "@src/utils/ascension"
import { Upgrade, UpgradeData } from "./upgrades"

/**
 * Creates a command string to equip an upgrade
 */
export function EquipUpgrade(upgrade: UpgradeData): string {
    let str = "character set " + upgrade.target + "\n"
    const upgradeName = Upgrade.Name(upgrade.type)
    const levelAsc = getMaxLevel(upgrade.visible - 1)
    switch (upgrade.type) {
        case Upgrade.NORMAL_ATTACK_LEVEL:
        case Upgrade.ELEMENTAL_SKILL_LEVEL:
        case Upgrade.ELEMENTAL_BURST_LEVEL:
            str += `character stat set ${upgradeName} ${upgrade.visible}\n`
            break
        case Upgrade.CHARACTER_LEVEL:
            str += `character level ${upgrade.visible}\n`
            break
        case Upgrade.CHARACTER_ASCENSION:
            str += `character level ${levelAsc}+\n`
            break
        case Upgrade.WEAPON_LEVEL:
            str += `weapon level ${upgrade.visible}\n`
            break
        case Upgrade.WEAPON_ASCENSION:
            str += `weapon level ${levelAsc}+\n`
            break
    }
    return str
}