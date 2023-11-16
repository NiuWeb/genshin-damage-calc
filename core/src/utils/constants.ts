import { Dictionary } from "@bygdle/cmdlang"
import { charbox, stats } from "@src/core"


/**
 * Returns a list of constants for a given party.
 * Constants are in the form:
 * 
 * 
 * ### `<character_name>_<stat>`
 * Like `diluc_level` or `hutao_hp_current`, only these constants are available:
 * - `level`
 * - `ascension`
 * - `hp_current`
 * - `energy_current`
 * - `normal_attack_level`
 * - `elemental_skill_level`
 * - `elemental_burst_level`
 */
export function GetConstants(party: charbox.Party) {

    const constants: Dictionary = {}
    const list = [
        stats.stat.LEVEL,
        stats.stat.ASCENSION,
        stats.stat.HP_CURRENT,
        stats.stat.ENERGY_CURRENT,
        stats.stat.NORMAL_ATTACK_LEVEL,
        stats.stat.ELEMENTAL_SKILL_LEVEL,
        stats.stat.ELEMENTAL_BURST_LEVEL,
    ]

    for(const member of party.GetMembers()) {
        const char = member.GetCharacter()
        const name = char.Options.Name.toLowerCase()
        const prefix = name + "_"

        for(const stat of list) {
            const key = prefix + stats.stat.Name(stat).toLowerCase()
            constants[key] = char.Get(stat).toString()
        }
    }

    return constants

}