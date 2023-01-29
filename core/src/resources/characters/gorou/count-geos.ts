import { charbox, stats } from "@src/core"

/** counts the number of geos in a party */
export function countGeos(target: charbox.Charbox): number {
    const party = target.GetParty()
    if (!party) {
        return (target.GetCharacter().Options.Element === stats.stat.GEO_DMG) ? 1 : 0
    }
    let count = 0
    for (const member of party.GetMembers()) {
        if (member.GetCharacter().Options.Element === stats.stat.GEO_DMG) {
            count++
        }
    }
    return count
}