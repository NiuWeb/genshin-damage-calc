import { charbox, stats } from "@src/core"

const pairs: [raw: number, up: number][] = [
    [stats.stat.NORMAL_ATTACK_LEVEL, stats.stat.NORMAL_ATTACK_LEVEL_UP],
    [stats.stat.ELEMENTAL_SKILL_LEVEL, stats.stat.ELEMENTAL_SKILL_LEVEL_UP],
    [stats.stat.ELEMENTAL_BURST_LEVEL, stats.stat.ELEMENTAL_BURST_LEVEL_UP],
]

/**
 * Copies the talent levels from a character to another, keeping the constellation upgrade.
 * 
 * Example: 
 * 
 * - origin has E=9 and its C0, but target has E=13 and C6.
 * - after the copy, target should have E=12 and C6.
 * 
 * @param copyFrom The character to copy talents from
 * @param copyTo The character to copy talents to
 */
export function CopyTalents(copyFrom: charbox.Charbox, copyTo: charbox.Charbox) {
    const charFrom = copyFrom.GetCharacter()
    const charTo = copyTo.GetCharacter()

    // paste the raw talent level to the target, but keep the constellation upgrade
    for (const [raw, up] of pairs) {
        const rawValue = charFrom.Get(raw) - charFrom.Get(up)
        const upValue = charTo.Get(up)
        charTo.Set(raw, rawValue + upValue)
    }
}