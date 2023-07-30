import { StatList } from "@src/core/stats/list"

/**
 * List of possible upgrades for a character
 */
export const Upgrade = StatList(
    "NORMAL_ATTACK_LEVEL",
    "ELEMENTAL_SKILL_LEVEL",
    "ELEMENTAL_BURST_LEVEL",
    "CHARACTER_LEVEL",
    "CHARACTER_ASCENSION",
    "WEAPON_LEVEL",
    "WEAPON_ASCENSION"
)

/**
 * Complete data about a single upgrade
 */
export interface UpgradeData {
    /** character being upgraded */
    target: string
    /** stars of the upgrade */
    stars: number
    /** upgrade type */
    type: number
    /** upgrade value */
    value: number
    /** upgrade visible value */
    visible: number
}