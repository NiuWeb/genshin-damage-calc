import { character, charbox, stats } from "@src/core"
import { getMaxLevel } from "@src/utils/ascension"
import { Upgrade, UpgradeData } from "./upgrades"

/**
 * Gets the available upgrades for the given character
 */
export function getUpgrades(charbox: charbox.Charbox): UpgradeData[] {
    const char = charbox.GetCharacter()
    const weapon = charbox.GetWeapon()

    const upgrades = getLevelUpgrades(char)
    if (weapon) {
        upgrades.push(...getLevelUpgrades(weapon, false))
    }

    upgrades.push(...getTalentUpgrades(char))
    return upgrades
}

/**
 * Gets the level/ascension upgrades for the given entity
 */
function getLevelUpgrades(entity: {
    GetLevel(): number,
    GetAscension(): number
    Options: { Name: string }
}, isChar = true): UpgradeData[] {
    const level = entity.GetLevel()
    const ascension = entity.GetAscension()
    const maxlevel = getMaxLevel(ascension)

    if (level < maxlevel) {
        return [{
            target: entity.Options.Name,
            type: isChar ? Upgrade.CHARACTER_LEVEL : Upgrade.WEAPON_LEVEL,
            value: maxlevel,
            visible: maxlevel
        }]
    } else if (ascension < 6) {
        return [{
            target: entity.Options.Name,
            type: isChar ? Upgrade.CHARACTER_ASCENSION : Upgrade.WEAPON_ASCENSION,
            value: ascension + 1,
            visible: ascension + 1
        }]
    }

    return []
}

/** max talent level per ascension */
const TALENTS = [1, 1, 2, 4, 6, 8, 10]

/** gets the available talent levels */
export function getTalentUpgrades(char: character.Character): UpgradeData[] {
    const ascension = char.GetAscension()

    const normalUp = char.Get(stats.stat.NORMAL_ATTACK_LEVEL_UP)
    const skillUp = char.Get(stats.stat.ELEMENTAL_SKILL_LEVEL_UP)
    const burstUp = char.Get(stats.stat.ELEMENTAL_BURST_LEVEL_UP)

    const normal = char.Get(stats.stat.NORMAL_ATTACK_LEVEL) - normalUp
    const skill = char.Get(stats.stat.ELEMENTAL_SKILL_LEVEL) - skillUp
    const burst = char.Get(stats.stat.ELEMENTAL_BURST_LEVEL) - burstUp

    const upgrades: UpgradeData[] = []

    if (normal < TALENTS[ascension]) {
        upgrades.push({
            target: char.Options.Name,
            type: Upgrade.NORMAL_ATTACK_LEVEL,
            value: normal + 1,
            visible: normal + 1 + normalUp
        })
    }

    if (skill < TALENTS[ascension]) {
        upgrades.push({
            target: char.Options.Name,
            type: Upgrade.ELEMENTAL_SKILL_LEVEL,
            value: skill + 1,
            visible: skill + 1 + skillUp
        })
    }

    if (burst < TALENTS[ascension]) {
        upgrades.push({
            target: char.Options.Name,
            type: Upgrade.ELEMENTAL_BURST_LEVEL,
            value: burst + 1,
            visible: burst + 1 + burstUp
        })
    }

    return upgrades
}