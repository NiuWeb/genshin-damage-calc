import { charbox, stats } from "@src/core"

/** check if nilou passives can be applied:
 * party members are only hydro or dendro and
 * there're at least one member of each one of
 * those elements.
 */
export function checkElements(target: charbox.Charbox): boolean {
    const party = target.GetParty()
    if (!party) { return false }

    let dendro = false
    let hydro = false

    for (const member of party.GetMembers()) {
        const element = member.GetCharacter().Options.Element
        if (element === stats.stat.DENDRO_DMG) {
            dendro = true
        } else if (element === stats.stat.HYDRO_DMG) {
            hydro = true
        } else {
            return false
        }
    }
    return dendro && hydro
}